import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminRoute from './Components/AdminRoute';
import Admin from './pages/Admin';
import ProtectedLayout from './Components/ProtectedLayout';
import Dashboard from './pages/Dashboard';
import CreateInvoices from './Components/CreateInvoices';
import Leads from './Components/Leads';
import GetInvoices from './Components/GetInvoices';
import NotFound from './Components/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin/>} />
        </Route>
        <Route element={<ProtectedLayout/>} >
          <Route path='/dashboard' element={<Dashboard />} >
            <Route index element={<CreateInvoices />} />
            <Route path='createinvoices' element={<CreateInvoices />} />
            <Route path='leads' element={<Leads />} />
            <Route path='getinvoices' element={<GetInvoices />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer limit={2} draggable={true} autoClose={2000} />
    </>
  );
}

export default App;
