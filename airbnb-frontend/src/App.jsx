import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Search from './pages/Search';
import Listing from './pages/Listing';
import Login from './pages/Login';
import MyReservations from './pages/MyReservations';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reservations" element={<MyReservations />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
