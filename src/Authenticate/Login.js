import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/", {
        email,
        password
      })
        .then(res => {
          if (res.data.status === "exist") {
            console.log(res.data);
            if (res.data.role === "ASC") {
              history("/components/ASC/aschome", { state: { id: email } });
            }
            if (res.data.role === "DIVISIONS") {
              history("/components/Divisions/DU1", { state: { id: email } });
            }
            if (res.data.role === "UNITS") {
              history("/components/Units/Unit01", { state: { id: email } });
            }
          }
          else if (res.data === "wrong credentials") {
            setError("Wrong credentials");
          }
          else if (res.data === "notexist") {
            alert("User has not signed up");
          }
        })
        .catch(e => {
          alert("Wrong details");
          console.log(e);
        });

    }
    catch (e) {
      console.log(e);
    }
  }
  function handleRedirect() {
    window.open("https://www.figma.com/file/c2Cen99OsqSHMt6ZF9xpe7/Untitled?type=whiteboard&node-id=0-1&t=wihC9wt6PVS25Qjz-0", "_blank");
  }
  

  return (
    <div className="card-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleRedirect} style={{ position: 'absolute', top: '10px', right: '10px' }} className="btn btn-info">
            FLOWCHART
          </button>
      <div className="card" style={{ maxWidth: '300px' }}>
      
      
        <div className="login">
        <h1>Login</h1>
        
          <form action="POST" style={{justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
          
          <label htmlFor="UserId">Enter UserID</label>
            <input type="text" id = "UserId" onChange={(e) => setEmail(e.target.value)} placeholder="UserID" />
            <br />
            <br />
            <label htmlFor="password">Enter Password</label>
            <input type="password" id = "password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <br />
            <br />
            <input type="submit" className="btn btn-success" onClick={submit} value={"Login"}/>
            <p>{Error}</p>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
}

export default Login;
