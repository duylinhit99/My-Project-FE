import { Link } from 'react-router-dom';
export default function AddToCart(props) {
  const { id } = props;

  const hanldeCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    // Nếu chưa có sản phẩm trong giỏ hàng thì thêm mới với số lượng là 1
    if (!cart[id]) {
      cart[id] = 1;
    } else {
      // co roi thi tang len 1
      cart[id] += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  return (
    <>
      <Link to="#" className="btn btn-default add-to-cart" onClick={hanldeCart}>
        <i className="fa fa-shopping-cart"></i>Add to cart
      </Link>
    </>
  );
}
