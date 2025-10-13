import { useEffect, useState } from 'react';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { Link } from 'react-router-dom';
function Cart() {
  const [item, setItem] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    api
      .post(API_URL.ADD_CART_PRODUCT, cart)
      .then((response) => {
        if (response) {
          const { data } = response.data;
          setItem(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let total = 0;
    Object.keys(item).map((key, i) => {
      total += item[key].qty * item[key].price;
    });
    setTotal(total);
  }, [item]);
  // tang so luong
  const handlePlus = (id) => {
    const newItem = { ...item };

    // Tăng số lượng lên 1 dựa vào id
    Object.keys(newItem).map((key, index) => {
      if (newItem[key].id === id) {
        newItem[key].qty += 1;
      }
    });
    // cập nhật lại item
    setItem(newItem);

    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    // Nếu có trong giỏ hàng thì tăng số lượng lên 1
    if (cart[id]) {
      cart[id] += 1;
    } else {
      //Nếu chưa có trong giỏ hàng thì thêm mới với số lượng là 1
      cart[id] = 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  // giam so luong
  const handleMinus = (id) => {
    // tạo ra bản sao của item -> shallow copy, deep copy là JSON.parse(JSON.stringify(item))
    const newItem = { ...item };

    Object.keys(newItem).map((key, index) => {
      if (newItem[key].id === id) {
        newItem[key].qty -= 1;
      }
    });

    setItem(newItem);

    // cập nhật lại localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart[id]) {
      cart[id] -= 1;
      // nếu số lượng giảm về 0 thì xóa sản phẩm khỏi giỏ hàng
      if (cart[id] === 0) {
        delete cart[id];
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const renderData = () => {
    if (Object.keys(item).length > 0) {
      return Object.keys(item).map((key, index) => {
        const imageArr = JSON.parse(item[key].image);
        const firstImg = imageArr[0];
        return (
          <tr key={key}>
            <td className="cart_product">
              <a href="">
                <img
                  src={`http://localhost/laravel8/public/upload/product/${item[key].id_user}/${firstImg}`}
                  alt=""
                  style={{ width: '100px' }}
                />
              </a>
            </td>
            <td className="cart_description">
              <h4>
                <a href="">{item[key].name}</a>
              </h4>
              <p>Web ID: {item[key].web_id}</p>
            </td>
            <td className="cart_price">
              <p>${item[key].price}</p>
            </td>
            <td className="cart_quantity">
              <div className="cart_quantity_button">
                <Link
                  className="cart_quantity_up"
                  href=""
                  onClick={() => handlePlus(item[key].id)}
                >
                  {' '}
                  +{' '}
                </Link>
                <input
                  className="cart_quantity_input"
                  type="text"
                  name="quantity"
                  value={item[key].qty}
                  autoComplete="off"
                  size="2"
                  readOnly
                />
                <Link
                  className="cart_quantity_down"
                  href=""
                  onClick={() => handleMinus(item[key].id)}
                >
                  {' '}
                  -{' '}
                </Link>
              </div>
            </td>
            <td className="cart_total">
              <p className="cart_total_price" id={item[key].id}>
                ${item[key].price * item[key].qty}
              </p>
            </td>
            <td className="cart_delete">
              <a className="cart_quantity_delete" href="">
                <i className="fa fa-times"></i>
              </a>
            </td>
          </tr>
        );
      });
    }
  };
  return (
    <>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          <div className="table-responsive cart_info">
            <table className="table table-condensed">
              <thead>
                <tr className="cart_menu">
                  <td className="image">Item</td>
                  <td className="description"></td>
                  <td className="price">Price</td>
                  <td className="quantity">Quantity</td>
                  <td className="total">Total</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>{renderData()}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping & Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href="">
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href="">
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>$61</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href="">
                  Update
                </a>
                <a className="btn btn-default check_out" href="">
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
