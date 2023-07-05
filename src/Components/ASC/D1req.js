import React, { useEffect, useState } from 'react';
import Web3 from 'web3'; // Make sure to import the required dependencies
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const D1req = () => {
  const location = useLocation();
  var loc = location.state.id;
  const [account, setAccount] = useState('Connection Status: NOT CONNECTED to Metamask');
  const [contract, setContract] = useState('Connection Status: NOT CONNECTED to Smart Contract');
  const [requests, setRequests] = useState([]);
  const [acpt, setAcpt] = useState([]);

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
    const filteredRequests = req.filter((item) => item[4]==loc);
    setRequests(filteredRequests);
  };

  const addRequest = async (reqid) => {
    var r = reqid;
    // Update the disabled state in the requests array
    const updatedRequests = requests.map((item, index) => {
      if (index === r) {
        return { ...item, disabled: true };
      }
      return item;
    });
    setRequests(updatedRequests);

    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const acptd = await window.contract.methods.showtoasc().call();
    var timestamp = new Date().toLocaleString();
    var nacpt = [acptd[r][0], acptd[r][1], acptd[r][2], acptd[r][3], acptd[r][4], 'AcceptedbyASC', timestamp];
    console.log(nacpt);
    console.log(acpt);
    setAcpt([...acpt, nacpt]);
  };

  const addreq = async () => {
    await window.contract.methods.acptbyUnits(acpt).send({ from: account });
  };

  return (
    <div>
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
        <tbody>
          {requests.map((req, index) => (
            <tr key={index}>
              <td>{req[0]}</td>
              <td>Request-{req[2]}</td>
              <td>{req[3]}</td>
              <td>{req[1]}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => addRequest(index)}
                  disabled={req.disabled}
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
    </div>
  );
};

export default D1req;
