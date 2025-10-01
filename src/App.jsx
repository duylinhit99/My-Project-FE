import { ToastContainer } from 'react-toastify';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import MenuLeft from './components/layouts/MenuLeft';
import Slider from './components/layouts/Slider';
import { useLocation } from 'react-router-dom';
import MenuAccount from './components/layouts/MenuAccount';
function App(props) {
  // includes kiem tra xem chuoi hoac object , array co chua phan tu do hay khong

  const param1 = useLocation();

  return (
    <>
      <Header />
      <Slider />
      <section>
        <div className="container">
          <div className="row">
            {param1['pathname'].includes('account') ? (
              <MenuAccount />
            ) : (
              <MenuLeft />
            )}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
