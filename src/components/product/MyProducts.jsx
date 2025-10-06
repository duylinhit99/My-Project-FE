import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { toast } from 'react-toastify';

function MyProducts() {
  const [products, setDataProd] = useState([]);

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

  const handleDelete = (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };

    api
      .get(API_URL.DELETE_PRODUCT + id, config)
      .then((res) => {
        if (res) {
          const { data } = res.data;
          setDataProd(data);
          toast.success('Xóa thành công!');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Xóa không thành công!');
      });
  };

  const renderProduct = () => {
    if (Object.keys(products).length > 0) {
      return Object.keys(products).map((key, index) => {
        const imgArr = JSON.parse(products[key].image);
        const firstImage = imgArr[0];
        return (
          <tr key={key}>
            <td>
              <h4>
                <a href="">{products[key].id}</a>
              </h4>
            </td>
            <td className="cart_description">
              <a href="">{products[key].name}</a>
            </td>
            <td className="cart_product">
              <img
                style={{ width: '100px', height: '100px' }}
                src={
                  'http://localhost/laravel8/public/upload/product/' +
                  products[key].id_user +
                  '/' +
                  firstImage
                }
                alt="product"
              />
            </td>
            <td className="cart_price">{products[key].price}</td>
            <td className="cart_total">
              <Link to={'/account/product/edit/' + products[key].id}>
                <i className="fa fa-pencil-square" aria-hidden="true"></i>
              </Link>
              <Link href="" onClick={() => handleDelete(products[key].id)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </Link>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="col-sm-9">
      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="id">Id</td>
              <td className="image">Image</td>
              <td className="description">Name</td>
              <td className="price">Price</td>
              <td className="total">Action</td>
            </tr>
          </thead>
          <tbody>{renderProduct()}</tbody>
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
