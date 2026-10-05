import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import HotelBooking from './pages/HotelBooking';
import Cinema from './pages/Cinema';
import MovieDetail from './pages/MovieDetail';
import CinemaBooking from './pages/CinemaBooking';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Team from './pages/Team';
import GymRegister from './pages/GymRegister';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:slug" element={<HotelDetail />} />
          <Route path="/hotels/:slug/book" element={<HotelBooking />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/cinema/movie/:id" element={<MovieDetail />} />
          <Route path="/cinema/book" element={<CinemaBooking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gym-register" element={<GymRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
