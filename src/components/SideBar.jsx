import React from 'react';
import { UserOutlined,DashboardOutlined  } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import hibretlogo from '../assets/hibretlogo.png';
import Dashenlogo from '../assets/DashenLogo.png';
import styles from './SideBar.module.css';

const { Sider } = Layout;
const { useToken } = theme;

const menuItems = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: 'Farmers List',
    path: '/farmersList',
  },
];

const Side = () => {
  const location = useLocation(); 
  const {
    token: { colorBgContainer, borderRadiusLG, colorWhite },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width={250}
        style={{
          background: 'linear-gradient(to bottom, #2D00B2,#181566 )',
          color: colorWhite,
          padding:6
        }}
        theme='dark'
      >
        <div className='mx-10 mt-5 '>
          <img src={Dashenlogo} alt="Logo" className="logo-image" />
        </div>
        
        <Menu
          defaultSelectedKeys={['2']}
          theme="white"
          style={{
            marginTop: 41
          }}
          selectedKeys={[location.pathname]} 
          // Set selectedKeys to the current location
        >
          {menuItems.map((item) => (
            <Menu.Item 
              key={item.path} 
              icon={item.icon} 
              className={styles.customMenuItem}
              style={{ color: colorWhite }}
              
            >
              <NavLink to={item.path} style={{ color: colorWhite }}>{item.label}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Side;
