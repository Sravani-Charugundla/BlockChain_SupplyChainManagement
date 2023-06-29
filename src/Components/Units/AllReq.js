import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllReq = () => {
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);

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

  const read = async () => {
    try {
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(ABI, Address);
      const req = await window.contract.methods.display1DArray().call();
      console.log(req);

      let ch = "";
      for (let l = req.length - 1; l >= 0; l--) {
        if(req[l][3]=="UNIT 01")
        {
          ch += `<tr>
            <td>${req[l][3]}</td>
            <td>Request-${req[l][2]}</td>
            <td>${req[l][0]}</td>
            <td>${req[l][1]}</td>
            <td><input type="text" readOnly value=${req[l][4]}></td>
          </tr>`;
        }
      }
      document.getElementById("sr").innerHTML = ch;
    } catch (error) {
      console.error('Error reading data:', error);
    }
  };

  return (
    <div className="container-md">
      <p id="accountArea">Account is: {account}</p>
      <p id="contractArea">Contract Connection Status: {contractConnected ? 'Success' : 'Not connected'}</p>

      <form className="form-floating">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">UNIT-ID</th>
                <th scope="col">REQUEST-ID</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody id="sr"></tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default AllReq;
