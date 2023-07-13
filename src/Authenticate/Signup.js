import React, { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import './Signup.css'


function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("http://localhost:8000/signup", {
                email, password, role
            })
                .then(res => {
                    if (res.data == "exist") {
                        alert("User already exists")
                    }
                    else if (res.data == "notexist") {
                        history("/", { state: { id: email } })
                    }
                })
                .catch(e => {
                    alert("wrong details")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);
        }

    }


    return (

        <div className="card-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="card" style={{ maxWidth: '300px' }}>
                <div className="Signup">
                    <h1>Signup</h1>
                    <form action="POST" style={{ justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                        <label htmlFor="UserId">Enter UserID</label>
                        <input type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder="UserID" />
                        <br />
                        <label htmlFor="password">Enter Password</label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                        <br />
                        <label htmlFor="role">Select Role</label>
                        <select id="role" onChange={(e) => { setRole(e.target.value) }}>
                            <option value="">--Select Role--</option>
                            <option value="ASC">ASC</option>
                            <option value="DIVISIONS">DIVISIONS</option>
                            <option value="UNITS">UNITS</option>
                        </select>
                        <br />
                        <input type="submit" className="btn btn-success" onClick={submit} value={"SignUp"} />
                        <p>{Error}</p>
                    </form>
                    {/* <p>OR</p>
            <br />
           <Link to="/">Login Page</Link> */}
                </div>
            </div>
        </div>

    )
}

export default Signup;