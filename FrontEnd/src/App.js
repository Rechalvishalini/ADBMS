import './App.css';
import HomePage from './Pages';
import Food from './Pages/food';
import Login from './Pages/login';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Pages/register';
import AdminDashboard from './Pages/admin';
import AdminFoods from './Pages/adminFoods';
import AdminRooms from './Pages/adminRooms';
import AdminCustomersPage from './Pages/adminCustomers';
import AdminInvoice from './Pages/adminInvoice';
import AdminEmployees from './Pages/adminEmployees';
import Rooms from './Pages/rooms';
import AdminProfits from './Pages/adminProfits';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/food" element={<Food/>}/>
          <Route path="/room" element={<Rooms/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/reg" element={<Register/>}/>
          <Route path="/AdminDash" element={<AdminDashboard/>}/>
          <Route path="/foodsAdmin" element={<AdminFoods/>}/>
          <Route path="/roomsAdmin" element={<AdminRooms/>}/>
          <Route path="/employeeAdmin" element={<AdminEmployees/>}/>
          <Route path="/cusAdmin" element={<AdminCustomersPage/>}/>
          <Route path="/invoiceAdmin" element={<AdminInvoice/>}/>
          <Route path="/profitAdmin" element={<AdminProfits/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
