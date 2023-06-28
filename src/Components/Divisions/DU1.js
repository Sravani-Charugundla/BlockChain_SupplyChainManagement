import React from 'react';
import { useNavigate } from 'react-router-dom';

const DU1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container-md">
    <div className="card-group">
        <div className="card">
            <div className="card-header">
                UNIT-1
              </div>
          
          <div className="card-body">
            <h5 className="card-title">Unit-1 Requests</h5>
           
            <button type="button" className="btn btn-info"
            onClick={()=>navigate("/Components/Divisions/U1req")}
            >Check Requests</button>
           
          </div>
        </div>
        <div className="card">
            <div className="card-header">
                UNIT-2
              </div>
        
          <div className="card-body">
            <h5 className="card-title">Unit-2 Requests</h5>
            
            <a  href="d1u2.html">
                <button type="button" className="btn btn-info">Check Requests</button>
                </a>
          </div>
        </div>
        <div className="card">
            <div className="card-header">
                UNIT-3
              </div>
         
          <div className="card-body">
            <h5 className="card-title">Unit-3 Requests</h5>
            <a  href="d1u3.html">
                <button type="button" className="btn btn-info">Check Requests</button>
                </a>
          </div>
        </div>
      </div>
</div>
  <br/>
    </div>
  );
};

export default DU1;
