import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation} from 'react-router-dom';
import { DivsaveRequestData } from '../Divisions/DivApi';


const U1req = () => {
  const location = useLocation();
  var loc = location.state.id;
  console.log(loc);
  localStorage.setItem('Unit_name',loc);
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [requests, setRequests] = useState([]);
  const [unav, setUnav] = useState([]);
  const [areq, setAreq] = useState([]);
  const [buttonStates, setButtonStates] = useState([]);

  useEffect(() => {
    connectMetamask();
    connectContract();
    readData();
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

  const readData = async () => {
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.display1DArray().call();
  
    const filteredRequests = req
      .filter((item) => item[3] === loc)
      .map((item, index) => ({
        id: index,
        unitId: item[3],
        requestId: item[0],
        item: item[1],
        quantity: item[2],
        queueDisabled: false,
        unavailDisabled: false,
      }));
  
    setRequests(filteredRequests.reverse());
  };
  
  var sord;
  const handleUnavailable = async (id) => {
    const updatedRequests = [...requests];
    updatedRequests[id].unavailDisabled = true;
    setRequests(updatedRequests);

    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.display1DArray().call();
    sord = req[id][2];
    const timestamp = new Date().toLocaleString();
    const nunav = [
      req[id][3],
      req[id][2],
      req[id][0],
      req[id][1],
      req[id][4],
      'SentToASC',
      timestamp,
    ];
    setUnav((prevUnav) => [...prevUnav, nunav]);
    console.log(nunav);
  };
  var sord;
  const handleQueueRequest = async (id) => {
    const updatedRequests = [...requests];
    updatedRequests[id].queueDisabled = true;
    setRequests(updatedRequests);
    

    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.display1DArray().call();
    sord = req[id][2];
    const timestamp = new Date().toLocaleString();
    const nreq = [
      req[id][3],
      req[id][2],
      req[id][0],
      req[id][1],
      req[id][4],
      'sentToUnits',
      timestamp,
    ];
    setAreq((prevAreq) => [...prevAreq, nreq]);
    console.log(areq);
  };

  const handleForwardRequest = async () => {
    try{
      const receipt = await window.contract.methods.dtu(areq).send({ from: account });
      const currentTimestamp = new Date().toLocaleString();
      const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);
      if(receipt.status)
      {
        const requestData = {
          RequestID: 1,
            UNITID: loc,
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success', 
        };
        await DivsaveRequestData(requestData);

      }


    }
    catch(error)
    {
      console.log(error);
    }
  };
  const handleForwardToASC = async () => {
    try{
      const receipt = await window.contract.methods.toAsc(unav).send({ from: account });
      const currentTimestamp = new Date().toLocaleString();
      const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);
      if(receipt.status)
      {
        const requestData = {
          RequestID: sord,
            UNITID: loc,
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: currentTimestamp,
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
        };
        await DivsaveRequestData(requestData);
        console.log("transaction Succesful");

      }


    }
    catch(error)
    {
      console.log(error);
    }
    // await window.contract.methods.toAsc(unav).send({ from: account });
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
                <th scope="col">Unavailable</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.unitId}</td>
                  <td>Request-{req.requestId}</td>
                  <td>{req.item}</td>
                  <td>{req.quantity}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info"
                      disabled={req.queueDisabled}
                      onClick={() => handleQueueRequest(req.id)}
                    >
                      Queue Request
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      disabled={req.unavailDisabled}
                      onClick={() => handleUnavailable(req.id)}
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
              Forward Request to other units
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
        </form>
      </div>
    </div>
  );
};

export default U1req;
