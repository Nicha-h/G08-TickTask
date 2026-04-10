import Navbar from "./components/Navbar";
import NavbarMobile from "./components/NavbarMobile";
import { useWindowSize } from './hooks/useWindowSize';

function App() {
  const { width, height } = useWindowSize();
  const isMobile = width <= 770 && height <= 1025;

  return (
    <>
      {isMobile ? <NavbarMobile /> : <Navbar />}
    </>
  );
}

export default App;
