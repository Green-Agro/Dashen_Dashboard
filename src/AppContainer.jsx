import { Fragment } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom"
import Spiner from './Spiner';
//import Side from './components/Side';

const AppContainer = () => {
  const isLoading = useSelector((state => state.loading.isLoading))

  return <Fragment>

    <div className='flex flex-row'>
      <div>
        <SideBar />
      </div>

      <div className='flex bg-wh flex-col w-full'>
        <Header />

        {isLoading && <Spiner />}
        <Outlet />
      </div>
    </div>



  </Fragment>
}
export default AppContainer