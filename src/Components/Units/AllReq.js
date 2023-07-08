import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, Button, Card } from 'react-bootstrap';
import './AllReq.css';

const AllReq = () => {
  var unit_name = localStorage.getItem('store_uni');

  // var div_name = localStorage.getItem('store_div');


  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
  const [reqData, setReqData] = useState([]); // State to hold the filtered request data
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);


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
    try {
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(ABI, Address);
      const req = await window.contract.methods.display1DArray().call();
      const filteredReq = req.filter((item) => item[3] === unit_name);
      setReqData(filteredReq.reverse());
    } catch (error) {
      console.error('Error reading data:', error);
    }
  };
  const handleCloseModal = () => {
    setShowTransactionModal(false);
  };

  const handleClick = async (reqid) => {
    console.log(reqid);
    try {
      const response = await axios.get(`http://localhost:8000/api/data/${reqid}`);
      const transactionData = response.data[0];
      console.log(transactionData);
      setTransactionDetails(transactionData);
      setShowTransactionModal(true);

    } catch (error) {
      console.error('Error fetching transaction details:', error);
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
                <th scope="col">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {reqData.map((item, index) => (
                <tr key={index}>
                  <td>{item[3]}</td>
                  <td>Request-{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>
                    <input type="text" readOnly value={item[5]} />
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => handleClick(item[0])}>
                      Transaction
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <Modal show={showTransactionModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details RequestID:  {transactionDetails?.RequestID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              {/* <Card.Title>Transaction Details</Card.Title> */}
              <div className="card-details">
                <p><strong>Transaction Hash:</strong></p>
                <p>{transactionDetails?.transactionHash}</p>
                <p><strong>From Address:</strong></p>
                <p>{transactionDetails?.toAddress}</p>
                <p><strong>To Address:</strong></p>
                <p>{transactionDetails?.fromAddress}</p>
                <p><strong>TimeStamp:</strong></p>
                <p>{transactionDetails?.timestamp}</p>
                <p><strong>GasUsed:</strong></p>
                <p>{transactionDetails?.gasUsed}</p>


                {/* Add more transaction details as needed */}
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default AllReq;
