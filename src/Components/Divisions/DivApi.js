import axios from 'axios';

export async function DivsaveRequestData(requestData) {
  try {
    // Convert BigInt values to strings
    requestData.transactionHash = requestData.transactionHash.toString();
    requestData.timestamp = requestData.timestamp.toString();
    requestData.gasUsed = requestData.gasUsed.toString();

    const response = await axios.post('http://localhost:8000/api/DivsaveRequestData', requestData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error('Error saving request data:', error);
    throw error;
  }
}
