import React from 'react';

const Aschome = () => {
  return (
    <div>
      <div className="container-md">
      <div className="row">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmdw4X0yThXcSwqgTPxyfMc1orQP1l2-n9Q&usqp=CAU" width="40%" height="280px" alt="Image" />
        </div>
        <div className="card-group">
          <div className="card">
            <div className="card-header">
              Divison-1
            </div>
            <div className="card-body">
              <h5 className="card-title">Division-1 Requests</h5>
              <a href="ascdiv1.html">
                <button type="button" className="btn btn-info">Check Requests</button>
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Division-2
            </div>
            <div className="card-body">
              <h5 className="card-title">Division-2 Requests</h5>
              <a href="d1u2.html">
                <button type="button" className="btn btn-info">Check Requests</button>
              </a>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Division-3
            </div>
            <div className="card-body">
              <h5 className="card-title">Division-3 Requests</h5>
              <a href="d1u3.html">
                <button type="button" className="btn btn-info">Check Requests</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aschome;
