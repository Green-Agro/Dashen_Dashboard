import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../index';

const FarmerDocumentService = () => {
  const { id } = useParams();
  const [farmerDocument, setFarmerDocument] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await apiClient.get(`upload/getByIdDocuments/${id}`);
          setFarmerDocument(response.data.documents.docs);
        console.log('Fetched farmer document:', response.data.documents.docs);
      } catch (error) {
        console.log('Error fetching farmer document:', error);
      }
    };
    fetchDocument();
  }, [id]);

  return farmerDocument;
};

export default FarmerDocumentService;