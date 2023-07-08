import React from 'react'
import { useLocation } from 'react-router-dom';
const CheckStatus = () => {
    const location = useLocation();
    const ordId = location.state.id;
  return (
    <div>CheckStatus{ordId}</div>
  )
}

export default CheckStatus;