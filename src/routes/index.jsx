import { Routes, Route } from 'react-router-dom';
import AppContainer from '../AppContainer';
import LoginPage from '../views/login/LoginPage';
import NotFound from '../views/NotFound';
import Dashboard from '../views/dashboard/Dashboard';
import FarmerList from '../views/farmer/FarmerList';
import FarmerInformation from '../views/farmer/FarmerInformation';
import Loan from '../views/farmer/Loan';
import Document from '../views/farmer/Document';
import FarmerDetailContainer from '../FarmerDetailContainer';

const RoutePage = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        {/* Nested Routes */}
        <Route path="/farmersList" element={<FarmerList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmerloan" element={<Loan />} />
        <Route path="/Document" element={<Document />} />
      </Route>
      <Route path="/" element={<FarmerDetailContainer />}>
        <Route path="/farmerinformation/:id" element={<FarmerInformation />} />
      </Route>  
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutePage;