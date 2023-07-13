import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Aschome.css'; // Import your custom CSS file for styling


const Aschome = () => {
  
  const navigate = useNavigate();
  const [divisionId, setDivisionId] = useState('');

  const handleDivisionChange = (event) => {
    setDivisionId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send `divisionId` as a prop to another unit or perform any other action you need.
    console.log('Division ID:', divisionId);
    navigate("/Components/ASC/D1req",{state:{id:divisionId}}); // Navigates to the D1 component with the divisionId as a parameter
  };

  return (
    <div className="container-md d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{height:'300px'}}>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <legend className="card-title">Check Requests from Divisions</legend>
            <div className="form-group">
              <label htmlFor="divisionID"  style={{marginTop:'30px'}}>Enter Division ID</label>
              <input
                type="text"
                className="form-control"
                id="divisionID"
                placeholder="DIVISIONID"
                value={divisionId}
                onChange={handleDivisionChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Check Requests</button>
          </div>
        </form>
      </div>
    </div>
  ); 
};

export default Aschome;
