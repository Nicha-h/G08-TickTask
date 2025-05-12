import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../src/components/routes/AppRoutes';
import { useWindowSize } from './hooks/useWindowSize';

function App() {
  const { width, height } = useWindowSize(); // ← include height
  const isMobile = width <= 770 && height <= 1025;


  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const token = getToken();

  return (
    <>
      {token && (isMobile ? <NavbarMobile /> : <Navbar />)}
      <AppRoutes />
    </>
  );
}

export default App;
