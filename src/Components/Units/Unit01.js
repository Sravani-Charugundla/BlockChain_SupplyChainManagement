import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UnitStyle.css'
import { useLocation } from 'react-router-dom';
import { saveRequestData } from './api';


const Unit01 = () => {
  const location = useLocation();
  var loc = location.state.id;
  const parts = loc.split(" ");
  var div_name = parts[0];
  var units_name = parts[1];
  localStorage.setItem('store_uni',units_name);
  localStorage.setItem('store_div',div_name);
  
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [data, setData] = useState([]);
  const [n, setN] = useState(0);
  const [i, setI] = useState(0);

  useEffect(() => {
    connectMetamask();
    connectContract();
  }, []);

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
    const newItem = (
      <div className="wrapper" style={{ textAlign: 'center' }}>
        <span className="inline">
          <input list="datalistOptions" id={i} placeholder="Item" />
          <input type="number" id={`${i}1`} placeholder="Quantity" />
        </span>
      </div>
    );
    setI(i + 1);
    setData((prevData) => [...prevData, newItem]);
  };

  const handleRemoveClick = () => {
    const newData = [...data];
    newData.pop();
    setData(newData);
  };
  var newData = [];
  const handleSeeClick = () => {
    if (n === 0) {
      
      let ordid4 = localStorage.getItem('counter4') || 0;
      const sord = ordid4.toString();
       

      for (let j = 0; j < i; j++) {
        const textValue = document.getElementById(`${j}`).value;
        const numValue = document.getElementById(`${j}1`).value;
        const timestamp = new Date().toLocaleString();
        const itemData = [sord,textValue, numValue ,units_name,div_name, 'SentToDivison', timestamp];
        newData.push(itemData);
      }

      console.log(newData);
      ordid4++;
      localStorage.setItem('counter4', ordid4);
    } else {
      alert('Place Request');
    }
  };

  const changeWord = async () => {
    if (n === 0) {
      try {

        console.log("Hi");
        const receipt = await window.contract.methods.save(newData).send({ from: account });
        
        const transactionReceipt = await window.web3.eth.getTransactionReceipt(receipt.transactionHash);

        const hash = receipt.transactionHash;
        setTransactionHash(hash);

        if (receipt.status) {
          const requestData = {
            transactionHash: transactionReceipt.transactionHash,
            toAddress: transactionReceipt.to,
            fromAddress: transactionReceipt.from,
            timestamp: new Date(transactionReceipt.blockTimestamp * 1000).toLocaleString(),
            gasUsed: transactionReceipt.gasUsed,
            status: 'success',
          };
          await saveRequestData(requestData);
          console.log('Transaction successful.');
          console.log('Transaction hash:', hash);
          setTransactionStatus('Transaction successful');
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
    <div>
      
      <p id="accountArea">Account is: {account}</p>
      <p id="contractArea">Contract Connection Status: {contractConnected ? 'Success' : 'Not connected'}</p>
      
      <p id="hash">Transaction hash: {transactionHash}</p>
      <p id="transactionStatus">Transaction status: {transactionStatus}</p>
      <h1 style={{ textAlign: 'center' }}>SUPPLY REQUEST FORM</h1>
      <div style={{ textAlign: 'right' }}>
        <button id="Add" className="btn btn-primary small-button" onClick={handleAddClick}>Click to Add Items</button>
        <button id="Remove" className="btn btn-primary small-button" onClick={handleRemoveClick}>Click to Remove Items</button>
      </div>

      <form>
        <div className="form-floating colored-div">
          <div style={{ textAlign: 'center' }}>
            <label>
              <h2>Supplies - Quantity</h2>
            </label>
          </div>
          <div id="textboxDiv">
            {data.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </form>

      <datalist id="datalistOptions">
        <option value="Watermelon" />
        <option value="Mango" />
        <option value="Orange" />
        <option value="Apple" />
        <option value="Banana" />
      </datalist>

      <div style={{ textAlign: 'center' }}>
        <button id="see" className="btn btn-warning" onClick={handleSeeClick}>ADD TO CART</button>
        <br />
        <br/>
        <button type="button" className="btn btn-success"onClick={changeWord}>Place Request</button>
      </div>
    </div>
  );
};

export default Unit01;
