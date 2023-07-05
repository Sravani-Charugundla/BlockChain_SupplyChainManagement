import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';

const OpReq = () => {
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [requests, setRequests] = useState([]);
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
    const req = await window.contract.methods.d_tu().call();
    console.log(req);
    const filteredRequests = req.filter(item => item[0] !==unit_name);
    setRequests(filteredRequests);
  };

  var acpt = [];
  const addRequest = async (reqid) => {
    const updatedRequests = [...requests];
    const reqIndex = reqid;
    const selectedRequest = updatedRequests[reqIndex];
    selectedRequest.disabled = true;

    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const acptd = await window.contract.methods.d_tu().call();
    const timestamp = new Date().toLocaleString();
    const nacpt = [
      acptd[reqIndex][0],
      acptd[reqIndex][1],
      acptd[reqIndex][2],
      acptd[reqIndex][3],
      reqIndex,
      "Divison -1 UNIT 01",
      timestamp
    ];
    console.log(nacpt);
    acpt.push(nacpt);

    setRequests(updatedRequests);
  };

  const addreq = async () => {
    await window.contract.methods.acptbyUnits(acpt).send({ from: account });
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
                      type="button"
                      className="btn btn-info"
                      id={index}
                      disabled={req.disabled}
                      onClick={() => addRequest(index)}
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
