import React from 'react';
const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#"><h1>Home</h1></a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmdw4X0yThXcSwqgTPxyfMc1orQP1l2-n9Q&usqp=CAU" width="40%" height="280px" />
        </div>
        <div className="row">
          <h2 style={{ textAlign: 'center' }}>SELECT USER</h2>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                ASC
              </div>
              <div className="card-body">
                <h5 className="card-title">ASC</h5>
                <p className="card-text">Army Service Corps</p>
                <a href="asc.html" className="btn btn-primary">Go to ASC page</a>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                ADST(Units)
              </div>
              <div className="card-body">
                <h5 className="card-title">ADST</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="units.html" className="btn btn-primary">Go to ADST page</a>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                DDST-(Divisions)
              </div>
              <div className="card-body">
                <h5 className="card-title">DDST</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="divisons.html" className="btn btn-primary">Go to DDST page</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* your content here */}
     
    </div>
  );
};

export default Home;
