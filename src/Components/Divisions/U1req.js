import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { DivsaveRequestData } from '../Divisions/DivApi';
import axios from 'axios';



const U1req = () => {
  const location = useLocation();
  var loc = location.state.id;

  localStorage.setItem('Unit_name', loc);
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [requests, setRequests] = useState([]);
  const [unav, setUnav] = useState([]);
  const [areq, setAreq] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [disabledButtons, setDisabledButtons] = useState(() => {
    const disabledButtonsFromStorage = JSON.parse(localStorage.getItem('disabledButtons')) || [];
    return disabledButtonsFromStorage;
  });


  useEffect(() => {
    connectMetamask();
    connectContract();
    readData();
    
  }, []);

  useEffect(() => {
    if (transactionStatus === 'Transaction successful') {
      // Create a new speech synthesis utterance
      const speechMessage = new SpeechSynthesisUtterance('Transaction successful and Request sent to ASC');
      // Use the speech synthesis API to speak the message
      window.speechSynthesis.speak(speechMessage);
    }
    else if(transactionStatus == "Transaction successful1")
    {
      const speechMessage = new SpeechSynthesisUtterance('Transaction successful and Request sent to Units');
      // Use the speech synthesis API to speak the message
      window.speechSynthesis.speak(speechMessage);

    }
  }, [transactionStatus]);

  const connectMetamask = async () => {
    if (window.ethereum !== undefined) {  
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    }
  };

  const connectContract = async () => {
    try {
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(ABI, Address);
      setContractConnected(true);
    } catch (error) {
      console.error('Error connecting to contract:', error);
    }
  };

  const updateOrderStatus = async (orderId,status, timestamp) => {
    try {
      const response = await axios.post('http://localhost:8000/api/SCMupdateOrderStatus', {
        orderId: orderId,
        status: status,
        timestamp: timestamp
      });
      console.log(response.data); // Log the response if needed
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const readData = async () => {
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.display1DArray().call();
    const filteredRequests = req.filter((item) => item[3] === loc);
    setRequests(filteredRequests.reverse());
  };

  var sord;
  const handleUnavailable = async (id, ord) => {
    console.log(id, ord);
    const updatedRequests = [...requests];
    var buttonId = id +"_" + ord+ "1";
    const updatedDisabledButtons = [...disabledButtons, buttonId];
    setDisabledButtons(updatedDisabledButtons);// Store the updated disabled buttons in local storage
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));
    setRequests(updatedRequests);
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.display1DArray().call();
    const filteredReq = req.filter(item => item[0] == id && item[1] == ord);
    if (filteredReq.length > 0) {
      const timestamp = new Date().toLocaleString();
      const nunav = [
        filteredReq[0][3],
        filteredReq[0][2],
        filteredReq[0][0],
        filteredReq[0][1],
        filteredReq[0][4],
        'sentToUnits',
        timestamp,
      ]
      setUnav((prevUnav) => [...prevUnav, nunav]);
    }
  };
  useEffect(() => {
    console.log(unav); // Log the updated value of `areq` after state update
  }, [unav]);


  var sord;
  const handleQueueRequest = async (id, ord) => {
    console.log(id, ord);
    const updatedRequests = [...requests];
    var buttonId = id+"_" + ord;
    const updatedDisabledButtons = [...disabledButtons, buttonId];
    setDisabledButtons(updatedDisabledButtons);// Store the updated disabled buttons in local storage
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));
    
    setRequests(updatedRequests);
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.display1DArray().call();
    const filteredReq = req.filter(item => item[0] === id && item[1] === ord);
    if (filteredReq.length > 0) {
      const timestamp = new Date().toLocaleString();
      const nreq = [
        filteredReq[0][3],
        filteredReq[0][2],
        filteredReq[0][0],
        filteredReq[0][1],
        filteredReq[0][4],
        'sentToUnits',
        timestamp,
      ];
      setAreq(prevAreq => [...prevAreq, nreq]);
    }
  };

  useEffect(() => {
    
    console.log(areq); // Log the updated value of `areq` after state update
  }, [areq]);

  const handleForwardRequest = async () => {
    try {
      const receipt = await window.contract.methods.dtu(areq).send({ from: account });
      const currentTimestamp = new Date().toLocaleString();
      const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);
      if (receipt.status) {
        for (var reqData of areq) {
          const requestData = {
            RequestID: reqData[2],
            UNITID: loc,
            Item:reqData[3],
            SentTo:"SentToOtherUnits",
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
          };
          await DivsaveRequestData(requestData);
          var reqId = reqData[2]+"_"+ reqData[3];
          await updateOrderStatus(reqId,'SentToOtherUnits', currentTimestamp);
        }
        setTransactionStatus('Transaction successful1');
      }
    }
    catch (error) {
      console.log(error);
    }
  };
  const handleForwardToASC = async () => {
    try {
      const receipt = await window.contract.methods.toAsc(unav).send({ from: account });
      const currentTimestamp = new Date().toLocaleString();
      const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);
      if(receipt.status)
      {
        for(var reqData of unav)
        {
          const requestData = {
            RequestID: reqData[2],
            UNITID: loc,
            Item:reqData[3],
            SentTo:"SentToASC",
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
          };
          await DivsaveRequestData(requestData);
          var reqId = reqData[2]+"_"+ reqData[3];
          await updateOrderStatus(reqId, 'SentToASC', currentTimestamp);

        }
        setTransactionStatus('Transaction successful');
      }
    }
    catch (error) {
      console.log(error);
    }
    // await window.contract.methods.toAsc(unav).send({ from: account });
  };

  return (
    <div>
      <div className="container-fluid">
        <p id="accountArea">Account is: {account}</p>
        <p id="contractArea">Contract Connection Status: {contractConnected ? 'Success' : 'Not connected'}</p>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">UNIT-ID</th>
                <th scope="col">REQUEST-ID</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">SentToUnits</th>
                <th scope="col">SentToASC</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index}>
                  <td>{req[3]}</td>
                  <td>Request-{req[0]}</td>
                  <td>{req[1]}</td>
                  <td>{req[2]}</td>
                  <td>
                    <button
                     id={`${req[0]}_${req[1]}`}
                     disabled={disabledButtons.includes(`${req[0]}_${req[1]}`)}
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleQueueRequest(req[0], req[1])}
                    >
                      QueueRequest
                    </button>
                  </td>
                  <td>
                    <button
                      id = {`${req[0]}_${req[1]}1`}
                      type="button"
                      className="btn btn-info"
                      disabled={disabledButtons.includes(`${req[0]}_${req[1]}1`)}
                      onClick={() => handleUnavailable(req[0], req[1])}
                    >
                      Unavailable
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-success btn-lg btn-block"
              onClick={handleForwardRequest}
            >
             BroadcastRequests
            </button>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-info btn-lg btn-block"
              onClick={handleForwardToASC}
            >
              Forward to ASC
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default U1req;