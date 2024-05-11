import { Fragment } from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { useSelector } from 'react-redux';
import Spiner from './Spiner';
import FarmerDetail from './views/farmer/FarmerDetail';
//import Side from './components/Side';

const FarmerDetailContainer = () => {
  const isLoading = useSelector((state => state.loading.isLoading))

  return <Fragment>

    <div className='flex flex-row'>
      <div>
        <SideBar />
      </div>

      <div className='flex bg-wh flex-col w-full'>
        <Header />

        {isLoading && <Spiner />}
        <FarmerDetail/>
      </div>
    </div>



  </Fragment>
}
export default FarmerDetailContainer