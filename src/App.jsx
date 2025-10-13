import { ToastContainer } from 'react-toastify';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import MenuLeft from './components/layouts/MenuLeft';
import Slider from './components/layouts/Slider';
import { useLocation } from 'react-router-dom';
import MenuAccount from './components/layouts/MenuAccount';
import { CartContext } from './contexts/CartContext';
function App(props) {
  // includes kiem tra xem chuoi hoac object , array co chua phan tu do hay khong

  const param1 = useLocation();
  const isCart = param1.pathname === '/cart';

  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQty = Object.keys(cart).reduce((total, key) => {
    return total + cart[key];
  }, 0);
  return (
    <CartContext.Provider value={{ totalQty }}>
      <Header />
      <Slider />
      <section>
        <div className="container">
          <div className="row">
            {!isCart && (
              <>
                {param1['pathname'].includes('account') ? (
                  <MenuAccount />
                ) : (
                  <MenuLeft />
                )}
              </>
            )}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </CartContext.Provider>
  );
}

export default App;
