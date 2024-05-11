import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../url/index';

const UploadDocumentService = (file) => {
  const { id } = useParams();
  const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    const uploadDocument = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post(`upload/document/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setFarmerData(response.data.data);
        console.log('Fetched farmer data detail:', response.data.data);
      } catch (error) {
        console.log('Error fetching farmer data:', error);
      }
    };

    uploadDocument();
  }, [id, file]);

  return farmerData;
};

export default UploadDocumentService;