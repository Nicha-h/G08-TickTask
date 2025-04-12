import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '../src/components/routes/AppRoutes';
const token = localStorage.getItem('token');
function App() {
  return (
    <>
      {token && <Navbar />}
      <AppRoutes />

    </>
  );
}

export default App;