import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';

import AdminDashboard from './pages/Admin/Dashboard';
import AdminCustomers from './pages/Admin/Customers';
import CustomerDetail from './pages/Admin/CustomerDetail';
import AdminAppointments from './pages/Admin/Appointments';
import AdminDoctors from './pages/Admin/Doctors';
import AdminServices from './pages/Admin/Services';

const AdminRoute = ({ children }) => {
  // In mock mode, admin pages are accessible directly after login
  // Wire up real auth check when backend is ready
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Customer-facing pages with Navbar + Footer */}
          <Route path="/" element={<><Navbar /><main><Home /></main><Footer /></>} />
          <Route path="/services" element={<><Navbar /><main><Services /></main><Footer /></>} />
          <Route path="/doctors" element={<><Navbar /><main><Doctors /></main><Footer /></>} />
          <Route path="/about" element={<><Navbar /><main><About /></main><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><main><Contact /></main><Footer /></>} />
          <Route path="/book-appointment" element={<><Navbar /><main><BookAppointment /></main><Footer /></>} />
          <Route path="/my-appointments" element={<><Navbar /><main><MyAppointments /></main><Footer /></>} />
          <Route path="/login" element={<Login />} />

          {/* Admin pages — no Navbar/Footer, has own AdminLayout */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/customers" element={<AdminRoute><AdminCustomers /></AdminRoute>} />
          <Route path="/admin/customers/:id" element={<AdminRoute><CustomerDetail /></AdminRoute>} />
          <Route path="/admin/appointments" element={<AdminRoute><AdminAppointments /></AdminRoute>} />
          <Route path="/admin/doctors" element={<AdminRoute><AdminDoctors /></AdminRoute>} />
          <Route path="/admin/services" element={<AdminRoute><AdminServices /></AdminRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
