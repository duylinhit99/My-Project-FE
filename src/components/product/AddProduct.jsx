import { useEffect, useState } from 'react';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { validateProduct } from '../../utils/validateProduct';
import Errors from '../errors/Errors';

function AddProduct() {
  const [input, setInput] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    status: '1',
    sale: 0,
    companyProfile: '',
    detail: '',
    avatars: [],
    salePrice: '',
  });

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [error, setError] = useState({});
  const [file, setFile] = useState();
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    api
      .get(API_URL.CATEGORY_BRAND)
      .then((response) => {
        const { data } = response;

        if (data) {
          setCategory(data.category);
          setBrand(data.brand);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSale = () => {
    if (input.status === '0') {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Sale Price"
            name="salePrice"
            style={{ width: 200, marginRight: 10 }}
            onChange={handleInput}
          />{' '}
          %
        </div>
      );
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput((state) => ({ ...state, [name]: value }));
  };

  const handleImg = (event) => {
    const file = event.target.files;

    const render = new FileReader();
    render.onload = (e) => {
      setAvatar(e.target.result); // gui qua api
      setFile(file[0]);
    };
    render.readAsDataURL(file[0]);
  };

  const handleBrand = () => {
    if (brand.length > 0) {
      return brand.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.brand}
          </option>
        );
      });
    }
  };

  const handleCategory = () => {
    if (category.length > 0) {
      return category.map((value, key) => {
        return (
          <option value={value.id} key={key}>
            {value.category}
          </option>
        );
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const error = validateProduct(input, file, 'addProduct');
    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    } else {
      const token = JSON.parse(localStorage.getItem('token'));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      };

      const formData = new FormData();
      formData.append('name', input.name);
      formData.append('price', input.price);
    }
  };
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">New Product</h2>
        <div className="signup-form">
          <h2>New User Signup!</h2>
          <Errors errors={error} />
          <form action="#" onSubmit={handleSubmit}>
            <label>Name (*)</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInput}
            />
            <label>Price (*)</label>
            <input
              type="text"
              name="price"
              placeholder="Price"
              onChange={handleInput}
            />
            <label>Category (*)</label>
            <select name="category">
              <option value="">Please choose Category</option>
              {handleCategory()}
            </select>
            <label>Brand (*)</label>
            <select name="brand">
              <option value="">Please choose Brand</option>
              {handleBrand()}
            </select>
            <label>Sale (*)</label>
            <select name="status" onChange={handleInput}>
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
            {handleSale()}
            <label>Compony profile (*)</label>
            <input type="text" name="companyProfile" onChange={handleInput} />
            <label>Avatar *</label>
            <input
              type="file"
              id="files"
              name="avatar"
              multiple
              onChange={handleImg}
            />
            <label>Detail</label>
            <textarea
              name="detail"
              placeholder="Detail"
              onChange={handleInput}
            ></textarea>
            <button type="submit" className="btn btn-default">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
