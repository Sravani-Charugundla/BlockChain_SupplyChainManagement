import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
// this page shows all requests that were made by this particular unit and they were accepted
const UniAcptReq = () => {
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [requestRows, setRequestRows] = useState([]);
  var unit_name = localStorage.getItem('store_uni');
  console.log(unit_name);
  var div_name = localStorage.getItem('store_div');
  console.log(div_name);

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
    const req = await window.contract.methods.showacceptedbyunits().call();

    const rows = req
      .filter(item => item[0] ==unit_name)
      .map(item => (
        <tr key={item[1]}>
          <td>{item[0]}</td>
          <td>Request-{item[2]}</td>
          <td>{item[3]}</td>
          <td>{item[1]}</td>
          <td>{item[5]}</td>
          <td>{item[6]}</td>
        </tr>
      ));

    setRequestRows(rows);
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
                <th scope="col">Accepted by</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>{requestRows}</tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default UniAcptReq;
