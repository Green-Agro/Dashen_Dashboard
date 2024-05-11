import React, { useEffect, useState, useRef } from 'react';
import { Table, Input, Button, Tooltip, Select, Space, Dropdown, Menu, Tag } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../url/index';
import { DownOutlined } from '@ant-design/icons';

const FarmerList = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // New state to store the selected loan status
  const navigate = useNavigate();

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`credit-score/search?key=${searchText}`);
        setData(response.data.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response.data.data.length,
          },
        });
        console.log('fetched', response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize, searchText]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }

    if (searchText !== tableParams.searchText) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: 1,
        },
        searchText,
      });
    }
  };

  const handleRowClick = (record) => {
    console.log('Row clicked:', record);
    navigate(`/farmerinformation/${record.id}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'FullName',
      sorter: true,
      render: (text, record) => (
        <Link to={`/farmer/farmerinformation/${record.id}`} style={{ color: 'blue' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'Age',
      sorter: (a, b) => a.Age - b.Age,
    },
    {
      title: 'Phone Number',
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      sorter: true,
    },
    {
      title: 'Land Size',
      dataIndex: 'Land_size',
      sorter: true,
    },
    {
      title: 'Loan Status',
      dataIndex: 'Loan_Status',
      sorter: true,
      render: (_, { Loan_Status }) => {
        let color = Loan_Status === 'pending' ? 'volcano' : 'blue';

        return (
          <Tag color={color}>
            {Loan_Status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const handleStatusFilter = (selectedStatus) => {
    setSelectedStatus(selectedStatus); // Store the selected loan status in state
  };

  const filteredData = selectedStatus
    ? data.filter((item) => item.Loan_Status === selectedStatus) // Apply the loan status filter if a status is selected
    : data;

  return (
    <div className="w-95 mx-6 mt-6">
      <Table
        columns={columns}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        title={() => (
          <div className="flex gap-6 justify-between ">
            <Tooltip placement="topLeft">
              <Input
                id="search-input"
                placeholder="Search Farmer"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-44"
              />
            </Tooltip>
            <Tooltip placement="topRight" trigger={['click']}>
              <Dropdown
                overlay={
                  <Menu onClick={({ key }) => handleStatusFilter(key)}>
                    <Menu.Item key="approved">Approved</Menu.Item>
                    <Menu.Item key="pending">Pending</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  <Space>
                    Select Status
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Tooltip>
          </div>
        )}
        dataSource={filteredData} // Use the`filteredData` array instead of the original `data` array
        scroll={{
          y: 320,
        }}
        onRow={(record) => ({
          onClick: () => {
            handleRowClick(record);
          },
        })}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default FarmerList;