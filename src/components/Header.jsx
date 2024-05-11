import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../store/slices/UserSlice';
import classes from './Header.module.css';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(userAction.setToken(null));
    dispatch(userAction.setIsAuthenticated(false));
    navigate('/login');
  };

  const openNotification = () => {
    setShow(true);
  };

  return (
    <Fragment>
      <div className={classes.headerNav + ' m-6 bg-white rounded-md d-flex mx-auto flex-row p-2'}>
        <div className='flex flex-row width-80'></div>

        <div className='ms-auto me-3 flex flex-row my-auto gap-x-5'>
          <button className={classes.notificationBtn} onClick={openNotification}>
            <i className="fa-regular fa-bell fs-2"></i>
          </button>

          <Avatar  icon={<UserOutlined />} className={classes.profileImg} />
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderComponent;
