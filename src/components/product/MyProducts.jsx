import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import API_URL from '../../api/API_URL';

function MyProducts() {
  const [dataProd, setDataProd] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };

    api
      .get(API_URL.PRODUCT_USER, config)
      .then((response) => {
        if (response && response.data) {
          setDataProd(response.data.data); // lưu list sản phẩm
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  }, []);

  return (
    <div className="col-sm-9">
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="image">image</td>
              <td className="description">name</td>
              <td className="price">price</td>
              <td className="total">action</td>
            </tr>
          </thead>
          <tbody>
            {dataProd && dataProd.length > 0 ? (
              dataProd.map((item) => (
                <tr key={item.id}>
                  <td className="cart_product">
                    <img
                      src={`http://localhost/laravel8/public/upload/product/${item.image}`}
                      alt={item.name}
                      style={{ width: 80 }}
                    />
                  </td>
                  <td className="cart_description">
                    <h4>{item.name}</h4>
                  </td>
                  <td className="cart_price">
                    <p>${item.price}</p>
                  </td>
                  <td className="cart_total">
                    <a href="#">
                      <i className="fa fa-pencil-square" aria-hidden="true"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Link to="/account/product/add">
          <button type="button" className="btn btn-default btn-primary">
            Add New
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MyProducts;
