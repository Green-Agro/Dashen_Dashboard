import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../url/index';

const FarmerDataService = () => {
  const { id } = useParams();
  const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`credit-score/farmer/${id}`);
        setFarmerData(response.data.data);
        console.log('Fetched farmer data detail:', response.data.data);
      } catch (error) {
        console.log('Error fetching farmer data:', error);
      }
    };

    fetchData();
  }, [id]);

  return farmerData;
};

export default FarmerDataService;