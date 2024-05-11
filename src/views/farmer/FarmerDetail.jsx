import React from 'react';
import { Tabs } from 'antd';
import FarmerInformation from './FarmerInformation';
import { useParams } from 'react-router-dom';
import Loan from './Loan';
import DocumentList from './DocumentList';
import Document from './Document';
import  classes  from './FarmerDetail.module.css';


const FarmerDetail = () => {
  const { id } = useParams();
  const tabItems = [
    { tab: 'Farmer Information', key: '1', content: <FarmerInformation id={id} /> },
    { tab: 'Loan', key: '2', content: <Loan id={id} /> },
    { tab: 'Document', key: '3', content: <DocumentList id={id} /> },
  ];

  return (
    <div className="w-95 mx-5 mt-6 h-500 ">
      <Document />

      <div className="mt-4 border-b-0">
        <Tabs className={classes.customtabs + 'pb-9 bg-white h-11 border-b-0'}>
          {tabItems.map((item) => (
            <Tabs.TabPane tab={item.tab} key={item.key}>
              {item.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDetail;