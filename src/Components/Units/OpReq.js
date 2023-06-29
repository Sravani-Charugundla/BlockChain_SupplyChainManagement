import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ABI from '../../contractABI';
import Address from '../../contractAddress';
import 'bootstrap/dist/css/bootstrap.min.css';

const OpReq = () => {
  const [account, setAccount] = useState('');
  const [contractConnected, setContractConnected] = useState(false);
 

  useEffect(() => {
    connectMetamask();
    connectContract();
    // read();
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

  


  return (
    <div>
      <div className="container-md">
      <p id="accountArea">Account is: {account}</p>
        <p id="contractArea">Contract Connection Status: {contractConnected ? 'Success' : 'Not connected'}</p>
        <form className="form-floating">
          <table className="table table-bordered table-hover" >
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
            </tbody>
          </table>
        </form>
      </div>
      <br />

      {/* <button type="button" className="btn btn-success" onclick={addreq()}>Accept Request</button> */}
    </div>
  )
}

export default OpReq;