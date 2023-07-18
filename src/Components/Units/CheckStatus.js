import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './timeline.css';



const CheckStatus = () => {
  const location = useLocation();
  const ordId = location.state.id;
  const [statusArray, setStatusArray] = useState([]);
  const [timestampArray, setTimestampArray] = useState([]);

  const DisplayStatus = async (ordId) => {
    try {
      const response = await axios.get(`http://localhost:8000/Statusapi/data/${ordId}`);
      const data = response.data[0];
      const statusArray = data.status;
      const timestampArray = data.timestamp;
      setStatusArray(statusArray);
      setTimestampArray(timestampArray);
    } catch (error) {
      console.error('Error fetching status', error);
    }
  };

  useEffect(() => {
    DisplayStatus(ordId);
  }, [ordId]);

  return (
    <div>
      <div style={{textAlign:'center'}}>
      <h3>Order ID: {ordId}</h3>
      </div>
      
      <div className="timeline">
        {statusArray.map((status, index) => (
          <div key={index} className="timeline-event">
            <div className="timeline-event-dot"></div>
            <div className="timeline-event-content">
              <h4>{status}</h4>
              <p>{timestampArray[index]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckStatus;
