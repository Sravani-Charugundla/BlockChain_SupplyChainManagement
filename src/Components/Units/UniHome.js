import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniHome = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <div className="row">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmdw4X0yThXcSwqgTPxyfMc1orQP1l2-n9Q&usqp=CAU"
            width="40%"
            height="280px"
            alt="Image"
          />
        </div>
        <div className="row">
          <h2 style={{ textAlign: 'center' }}>SELECT USER</h2>
          <div className="col-6">
            <div className="card">
              <div className="card-header">UNIT-1</div>
              <div className="card-body">
                <h5 className="card-title">UNIT-1</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/Components/Units/Unit01")}
                >
                  Go to Unit-1
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">UNIT-2</div>
              <div className="card-body">
                <h5 className="card-title">UNIT-2</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
                <a href="unit02.html" className="btn btn-primary">
                  Go to UNIT-2 page
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniHome;
