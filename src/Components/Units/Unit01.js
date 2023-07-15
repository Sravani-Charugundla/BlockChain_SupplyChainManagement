import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UnitStyle.css'
import { useLocation } from 'react-router-dom';
import { saveRequestData } from './api';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Unit01 = () => {
  const location = useLocation();
  var loc = location.state.id;
  const parts = loc.split(" ");
  var div_name = parts[0];
  var units_name = parts[1];
  localStorage.setItem('store_uni', units_name);
  localStorage.setItem('store_div', div_name);

  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [data, setData] = useState([
    { id: 0, itemValue: '', quantityValue: '' } // Initial set of input boxes
  ]);
  const [n, setN] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [newData, setNewData] = useState([]); // Store newData as a state variable

  useEffect(() => {
    connectMetamask();
    connectContract();
  }, []);

  useEffect(() => {
    setBadgeCount(newData.length);
  }, [newData]);

  const connectMetamask = async () => {
    if (window.ethereum !== undefined) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        document.getElementById('accountArea').innerHTML = `Account is: ${selectedAccount}`;
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
      document.getElementById('contractArea').innerHTML = 'Contract Connection Status: Success';
    } catch (error) {
      console.error('Error connecting to contract:', error);
    }
  };

  const handleAddClick = () => {
    const newItem = {
      id: data.length,
      itemValue: '',
      quantityValue: ''
    };
    setData((prevData) => [...prevData, newItem]);
  };

  const handleRemoveClick = (id) => {
    setData((prevData) => prevData.filter(item => item.id !== id));
  };

  const handleSeeClick = () => {
    if (n === 0) {
      let ordid4 = localStorage.getItem('counter4') || 0;
      const sord = ordid4.toString();

      const newData = data.map(item => {
        const textValue = item.itemValue;
        const numValue = item.quantityValue;
        const timestamp = new Date().toLocaleString();
        return [sord, textValue, numValue, units_name, div_name, 'SentToDivison', timestamp];
      });

      console.log(newData);
      ordid4++;
      localStorage.setItem('counter4', ordid4);
      setNewData(newData); // Update the newData state
    } else {
      alert('Place Request');
    }
    setShowInfo(!showInfo);
  };

  const updateOrderStatus = async (orderId, status, timestamp) => {
    try {
      const response = await axios.post('http://localhost:8000/api/SCMupdateOrderStatus', {
        orderId: orderId,
        status: status,
        timestamp: timestamp
      });
      console.log(response); // Log the response if needed
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const changeWord = async () => {
    if (n === 0) {
      try {
        const receipt = await window.contract.methods.save(newData).send({ from: account });
        const currentTimestamp = new Date().toLocaleString();

        const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);

        const hash = receipt.transactionHash;
        setTransactionHash(hash);

        if (receipt.status) {
          for (var reqData of newData) {
            console.log(reqData[1]);
            const requestData = {
              RequestID: reqData[0], // Use the updated request ID from newData
              UNITID: loc,
              Item: reqData[1],
              transactionHash: transactionReceipt.transactionHash,
              toAddress: transactionReceipt.to,
              fromAddress: transactionReceipt.from,
              timestamp: currentTimestamp,
              gasUsed: transactionReceipt.gasUsed,
              status: 'success',
            };
            await saveRequestData(requestData);
            console.log('Transaction successful.');
            console.log('Transaction hash:', hash);
            setTransactionStatus('Transaction successful');
            var reqId = reqData[0] + "_" + reqData[1];
            await updateOrderStatus(reqId, 'SentToDivisions', currentTimestamp);
          }
        } else {
          console.log('Transaction hash:', hash);
          setTransactionStatus('Transaction failed');
        }

        setN(n + 1);
      } catch (error) {
        console.error('Transaction error:', error);
        setTransactionStatus('Transaction error');
      }
    } else {
      alert("You can't add items now!");
    }
  };

  return (
    <div className="unit-container mt-5">
      <h1 className="mt-10" style={{ textAlign: 'center' }}>SUPPLY REQUEST FORM</h1>
      <div style={{ display: 'none' }}>
        <p id="accountArea">Account is: {account}</p>
        <p id="contractArea">Contract Connection Status: {contractConnected ? 'Success' : 'Not connected'}</p>
      </div>
      <form>
        <div className="form-floating colored-div responsive-div">
          {data.map((item) => (
            <div key={item.id} className="wrapper">
              <span className="inline">
                <div className="input-group">
                  <input
                    list="datalistOptions"
                    id={item.id}
                    placeholder="Item"
                    className="form-control"
                    value={item.itemValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData(prevData => prevData.map(prevItem => prevItem.id === item.id ? { ...prevItem, itemValue: value } : prevItem));
                    }}
                  />
                  <input
                    type="number"
                    id={`${item.id}1`}
                    placeholder="Quantity"
                    className="form-control"
                    value={item.quantityValue}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData(prevData => prevData.map(prevItem => prevItem.id === item.id ? { ...prevItem, quantityValue: value } : prevItem));
                    }}
                  />
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveClick(item.id)}
                >
                  Remove Item
                </button>
              </span>
            </div>
          ))}
        </div>
      </form>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button id="Add" className="btn btn-info" onClick={handleAddClick}>Click to Add Items</button>
      </div>
      <datalist id="datalistOptions">
        <option value="Watermelon" />
        <option value="Mango" />
        <option value="Orange" />
        <option value="Apple" />
        <option value="Banana" />
      </datalist>
      <div style={{ textAlign: 'center' }}>
        <button id="see" className="btn btn-warning" onClick={handleSeeClick}>
          Confirm Request
        </button>
        <br />
        <br />
        {showInfo && (
          <div>
            <button type="button" className="btn btn-success position-relative" onClick={changeWord}>
              Place Request
              {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {badgeCount}
                <span className="visually-hidden">unread messages</span>
              </span> */}
            </button>
          </div>
        )}
      </div>
      <p id="transactionStatus" className={`transaction-status ${transactionStatus === 'Transaction successful' ? 'transaction-success' : 'transaction-failed'}`}>
        Transaction status: {transactionStatus}
      </p>
    </div>
  );
};

export default Unit01;
