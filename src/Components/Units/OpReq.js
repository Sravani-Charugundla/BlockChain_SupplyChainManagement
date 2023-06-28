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

  const read = async()=>{
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    const req = await window.contract.methods.d_tu().call();
    console.log(req);
    var ch="";
    for(let l=req.length-1;l>=0;l--)
    {
            if(req[l][0]!="UNIT 02")
            {
                ch+=`<tr>
                <td>${req[l][0]}</td>
                <td>Request-${req[l][1]}</td>
                <td>${req[l][2]}</td>
                <td>${req[l][3]}</td>
                <td><button type="button" class="btn btn-info" id = "${l}" onclick={addRequest(this.id)}>Queue Request</button></td>						
              </tr>

            `
}
        
        
    }
        document.getElementById("sr").innerHTML=ch

}

var acpt = [];
const addRequest = async(reqid)=>
{
var r = reqid;
document.getElementById(r).disabled = true;
window.web3 = await new Web3(window.ethereum);
window.contract = await new window.web3.eth.Contract(ABI, Address);
const acptd = await window.contract.methods.d_tu().call();
var timestamp = new Date().toLocaleString(); // Get current timestamp as a formatted string
var nacpt = [acptd[r][0],acptd[r][1],acptd[r][2],acptd[r][3],r,"Divison -1 UNIT 01",timestamp];
console.log(nacpt);
acpt.push(nacpt);
}
const addreq = async() =>
{
    await window.contract.methods.acptbyUnits(acpt).send({ from: account });
}

  

  return (
    <div>
        <div class="container-md">

<form class="form-floating">
<table class="table table-bordered table-hover" >
    <thead class="table-dark">
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
<br/>

<button type="button" className="btn btn-success" onclick={addreq()}>Accept Request</button>
    </div>
  )
}

export default OpReq;