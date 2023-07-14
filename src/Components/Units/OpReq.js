import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveRequestData } from './api';
import axios from 'axios';

const OpReq = () => {
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [requests, setRequests] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [disabledButtons,setDisabledButtons]=useState(()=>{
    const disabledButtonsFromStorage = JSON.parse(localStorage.getItem('disabledButtons')) || [];
    return disabledButtonsFromStorage;
  })
  const [acpt, setAcpt] = useState([]);
  var unit_name = localStorage.getItem('store_uni');

  var div_name = localStorage.getItem('store_div');


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
      setContractConnected(true);
    } catch (error) {
      console.error('Error connecting to contract:', error);
    }
  };

  const read = async () => {
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.d_tu().call();
    console.log(req);
    const filteredRequests = req.filter(item => item[0] !== unit_name);
    setRequests(filteredRequests.reverse());
  };

  const addRequest = async (reqid,ord) => {
    var r = reqid;
    console.log(reqid,ord);
    // Update the disabled state in the requests array
    const updatedRequests  = [...requests];
    var buttonId = reqid+"_" + ord + "2";
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
       'AcceptedbyUnits',
        timestamp,]
      setAcpt(prevAcpt => [...prevAcpt, nacpt]);
    }

  };
  useEffect(()=>{
    console.log(acpt);
  },[acpt]);


  const addreq = async () => {
    try{
      const receipt =     await window.contract.methods.acptbyUnits(acpt).send({ from: account });
      const currentTimestamp = new Date().toLocaleString();
      const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);
      if (receipt.status) {
        for (var reqData of acpt) {
          console.log(reqData);
          const requestData = {
            RequestID: reqData[2],
            UNITID: unit_name,
            Item:reqData[3],
            SentTo:"AcceptedByASC",
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
          };
          await saveRequestData(requestData);
          var reqId = reqData[2]+"_"+reqData[3];
          await updateOrderStatus(reqId, 'AcceptedByASC', currentTimestamp);
        }
      }

    }
    catch (error) {
      console.log(error);
    }
  };
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

  return (
    <div>
      <div className="container-md">
        <p id="accountArea">Account is: {account}</p>
        <p id="contractArea">Contract Connection Status: {contractConnected ? 'Success' : 'Not connected'}</p>
        <form className="form-floating">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">UNIT-ID</th>
                <th scope="col">REQUEST-ID</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Queue Request</th>
              </tr>
            </thead>
            <tbody id="sr">
              {requests.map((req, index) => (
                <tr key={index}>
                  <td>{req[0]}</td>
                  <td>Request-{req[2]}</td>
                  <td>{req[3]}</td>
                  <td>{req[1]}</td>
                  <td>
                    <button
                     id = {`${req[2]}_${req[3]}2`}
                      type="button"
                      className="btn btn-info"
                      disabled={disabledButtons.includes(`${req[2]}_${req[3]}2`)}
                      onClick={() => addRequest(req[2],req[3])}
                    >
                      Queue Request
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <br />
      <button type="button" className="btn btn-success" onClick={addreq}>Accept Request</button>
    </div>
  );
};

export default OpReq;
