import { Outlet } from 'react-router';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen max-w-7xl mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
