import Navbar from "./components/Navbar";
<<<<<<< HEAD
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
=======

function App() {
  return (
    <>
      <Navbar />
>>>>>>> 5b5d2c643b1bf74c8f93b7669e40e19bb3c056a9
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 5b5d2c643b1bf74c8f93b7669e40e19bb3c056a9
