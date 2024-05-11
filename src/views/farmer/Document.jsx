import { CloudUploadOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiClient from '../../url/index';

const Document = (props) => {
  const { id } = useParams();
  const [isApproved, setIsApproved] = useState(false);

  const requestBody = {
    loanStatus: 'approved'
  };

  useEffect(() => {
    const handleApprove = async () => {
      try {
        const response = await apiClient.put(`credit-score/farmer/approval/${id}`, requestBody);
        console.log('approve success:', response);
        if (response.status === 200) {
          setIsApproved(true);
        }
      } catch (error) {
        console.log('Error when approving:', error);
      }
    };

    handleApprove();
  }, [id]);

  return (
    <div className='flex justify-end gap-4'>
      <button className="bg-ad text-white font-bold h-10 w-60 pr-3 rounded-md">
        <CloudUploadOutlined className="text-black pr-3" />
        Upload Document
      </button>
      <button className='bg-ad text-white font-bold h-10 w-40 rounded-md' disabled={isApproved}>
        {isApproved ? 'Approved' : 'Approve'}
      </button>
    </div>
  );
};

export default Document;