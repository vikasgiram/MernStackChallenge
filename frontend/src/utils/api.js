import axios from 'axios';



const BASE_URL = 'http://localhost:5000/api';

export const listTransactions = async ({ month, search }) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions`, {
      params: { month, search },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const statistics= async(month)=>{

  try{
    const response = await axios.get(`${BASE_URL}/statistics`,{
      params:{month},
    });
    return response.data;
  }catch(error){
    console.log("Error while geting stasticts: ",error);
  }
};

export const fetchBarChartData = async (month) => {
  try{
    const response = await axios.get(`${BASE_URL}/bar-chart`,{
      params: {month},
    });
    return response.data;
  }catch(error){
    console.log("Error while geting bar chart data: ",error);
  }
};
