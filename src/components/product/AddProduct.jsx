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
    companyProfile: '',
    detail: '',
    avatars: [],
    salePrice: '',
  });

  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [error, setError] = useState({});
  const [file, setFile] = useState([]);

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
    const files = event.target.files;
    const newFiles = [...file, ...files];
    setFile(newFiles);
    setInput((state) => ({ ...state, avatars: newFiles }));
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

    const error = validateProduct(input, 'addProduct', file);
    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    } else {
      const token = JSON.parse(localStorage.getItem('token'));

      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      const formData = new FormData();
      formData.append('name', input.name);
      formData.append('price', input.price);
      formData.append('category', input.category);
      formData.append('brand', input.brand);
      formData.append('company', input.companyProfile);
      formData.append('status', input.status);
      formData.append('sale', input.salePrice);
      formData.append('detail', input.detail);

      // khi cần gửi nhiều file ảnh thì cần map
      Object.keys(file).map((item, index) => {
        formData.append('file[]', file[item]);
      });

      console.log([...formData.entries()]);

      api
        .post(API_URL.ADD_PRODUCT, formData, config)
        .then((response) => {
          if (response) {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
            <select name="category" onChange={handleInput}>
              <option value="">Please choose Category</option>
              {handleCategory()}
            </select>
            <label>Brand (*)</label>
            <select name="brand" onChange={handleInput}>
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
            {file.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: 10 }}>
                {file.map((f, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(f)}
                    alt="preview"
                    width="100"
                    height="100"
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                ))}
              </div>
            )}
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
