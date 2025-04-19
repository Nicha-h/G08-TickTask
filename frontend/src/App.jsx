import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../src/components/routes/AppRoutes';

function App() {
  
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };
  
  const token = getToken();
  
  return (
    <>
      {token && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;