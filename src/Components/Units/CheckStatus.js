import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <h3>Order ID: {ordId}</h3>
      <div class="container">
        <ul class="timeline">
          {statusArray.map((status, index) => (
            <li key={index}>
              <div class="timeline-badge"><i class="glyphicon glyphicon-check"></i></div>
              <div class="timeline-panel">
                <div class="timeline-heading">
                  <h4 class="timeline-title">{status}</h4>
                  <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> {timestampArray[index]}</small></p>
                </div>
                <div class="timeline-body">
                  <p>Content for this status</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CheckStatus;
