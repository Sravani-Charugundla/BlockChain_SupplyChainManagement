import React, { useEffect, useState } from 'react';
import Web3 from 'web3'; // Make sure to import the required dependencies
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { ASCsaveRequestData } from './ASCApi';
import axios from 'axios';


const D1req = () => {
  const location = useLocation();
  var loc = location.state.id;
  localStorage.setItem('Div_name',loc);
  const [account, setAccount] = useState('Connection Status: NOT CONNECTED to Metamask');
  const [contract, setContract] = useState('Connection Status: NOT CONNECTED to Smart Contract');
  const [requests, setRequests] = useState([]);
  const [acpt, setAcpt] = useState([]);
  const [unav, setUnav] = useState([]);
  const [disabledButtons,setDisabledButtons]=useState(()=>{
    const disabledButtonsFromStorage = JSON.parse(localStorage.getItem('disabledButtons')) || [];
    return disabledButtonsFromStorage;
  })

  useEffect(() => {
    connectMetamask();
    connectContract();
    read();
  }, []);

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
      setContract('Connection Status: CONNECTED to Smart Contract');
    } catch (error) {
      console.error('Error connecting to contract:', error);
    }
  };

  const read = async () => {
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.showtoasc().call();
    console.log(req);
    const filteredRequests = req.filter((item) => item[4]==loc);
    setRequests(filteredRequests.reverse());
  };

  const addRequest = async (reqid,ord) => {
    var r = reqid;
    console.log(reqid,ord);
    // Update the disabled state in the requests array
    const updatedRequests  = [...requests];
    var buttonId = reqid + "2";
    const updatedDisabledButtons = [...disabledButtons, buttonId];
    setDisabledButtons(updatedDisabledButtons);// Store the updated disabled buttons in local storage
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));
    setRequests(updatedRequests);
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const acptd = await window.contract.methods.showtoasc().call();
    console.log(acptd);
    const filteredReq = acptd.filter(item=>item[2]==reqid&&item[3]==ord);
    if(filteredReq.length>0)
    {
      const timestamp = new Date().toLocaleString();

      const nacpt = [filteredReq[0][0],
       filteredReq[0][1],
       filteredReq[0][2], 
       filteredReq[0][3], 
       filteredReq[0][4], 
       'AcceptedbyASC',
        timestamp,]
      setAcpt(prevAcpt => [...prevAcpt, nacpt]);
    }

  };
  useEffect(()=>{
    console.log(acpt);
  },[acpt]);

  const handleForwardToDivs = async(id,ord)=>{
    console.log(id,ord);
    const updatedRequests = [...requests];
    var buttonId = id+"3";
    const updatedDisabledButtons = [...disabledButtons, buttonId];
    setDisabledButtons(updatedDisabledButtons);// Store the updated disabled buttons in local storage
    localStorage.setItem('disabledButtons', JSON.stringify(updatedDisabledButtons));
    setRequests(updatedRequests);
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.showtoasc().call();
    const filteredReq = req.filter(item=>item[2]==id&&item[3]==ord);
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
      ];
      setUnav(prevUnav => [...prevUnav, nunav]);
    }
  }

  useEffect(()=>{
    console.log(unav);
  },[unav]);
 
  const updateOrderStatus = async (orderId, status, timestamp) => {
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

  const addreq = async () => {
    try{
      const receipt =     await window.contract.methods.acptbyUnits(acpt).send({ from: account });
      const currentTimestamp = new Date().toLocaleString();
      const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);
      if (receipt.status) {
        for (var reqData of acpt) {
          const requestData = {
            RequestID: reqData[2],
            UNITID: loc,
            Item:reqData[3],
            SentTo:"AcceptedByASC",
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
          };
          await ASCsaveRequestData(requestData);
          await updateOrderStatus(reqData[2], 'AcceptedByASC', currentTimestamp);
        }
      }

    }
    catch (error) {
      console.log(error);
    }
  };
  const handleForwardToDiv = async()=>{
    try {
      const receipt = await window.contract.methods.AscToDiv(unav).send({ from: account });
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
            SentTo:"SentToDivisions",
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
          };
          await ASCsaveRequestData(requestData);
          await updateOrderStatus(reqData[1],'SentToDiv', currentTimestamp);

        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">UNIT-ID</th>
            <th scope="col">REQUEST-ID</th>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Available</th>
            <th scope = "col">Queue Request</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req[0]}</td>
              <td>Request-{req[2]}</td>
              <td>{req[3]}</td>
              <td>{req[1]}</td>
              <td>
                <button
                  id = {`${req[2]}2`}
                  type="button"
                  className="btn btn-info"
                  onClick={() => addRequest(req[2],req[3])}
                  disabled={disabledButtons.includes(`${req[2]}2`)}
                >
                  Available
                </button>
              </td>
              <td>
                <button
                  id = {`${req[2]}3`}
                  type="button"
                  className="btn btn-info"
                  onClick={() => handleForwardToDivs(req[2],req[3])}
                  disabled={disabledButtons.includes(`${req[2]}3`)}
                >
                  Queue Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button type="button" className="btn btn-success" onClick={addreq}>
        Accept Request
      </button>
      <br/>
      <br/>
      <button type="button" className="btn btn-danger" onClick={handleForwardToDiv}>
        SendToDivisions
      </button>
    </div>
  );
};

export default D1req;
