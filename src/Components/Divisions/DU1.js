import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Aschome = () => {
  
  const navigate = useNavigate();
  const [UnitId, setUnitId] = useState('');

  const handleDivisionChange = (event) => {
    setUnitId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can send `divisionId` as a prop to another unit or perform any other action you need.
    console.log('Unit-ID:', UnitId );
    navigate("/Components/Divisions/U1req",{state:{id:UnitId}}); // Navigates to the D1 component with the divisionId as a parameter
  };

  return (
    <div className="container-md d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card" style={{height:'300px'}}>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <legend className="card-title">Check Requests from Units</legend>
            <div className="form-group">
              <label htmlFor="divisionID" style={{marginTop:'30px'}}>Enter Unit ID</label>
              <input
                type="text"
                className="form-control"
                id="divisionID"
                placeholder="Unit ID"
                value={UnitId}
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
