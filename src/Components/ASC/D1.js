import React from 'react'

const D1 = () => {
  return (
    <div>
        <div className="container">
        <div className="row">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfmdw4X0yThXcSwqgTPxyfMc1orQP1l2-n9Q&usqp=CAU" width="40%" height="280px" alt="Image" />
        </div>
        <div className="row">
          <h2 style={{ textAlign: 'center' }}>SELECT USER</h2>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                Division-1
              </div>
              <div className="card-body">
                <h5 className="card-title">Division-1</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate("/Components/Divisions/DU1")}
                >
                  Go to Division-1 page
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                Division-2
              </div>
              <div className="card-body">
                <h5 className="card-title">Division-2</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/vendor.html")}
                >
                  Go to Division-2 page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default D1