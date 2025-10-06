import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { validateProduct } from '../../utils/validateProduct';
import { toast } from 'react-toastify';

function EditMyProduct() {
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

  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState([]); // ảnh lấy từ api
  const [userData, setUserData] = useState('');

  const [file, setFile] = useState([]); // ảnh mới cần gửi lên api
  // luu gia tri cua checkbox
  const [deleteImg, setDeleteImg] = useState([]); // ảnh cần xóa
  const [error, setError] = useState({});
  const { id } = useParams();

  // call api lay data ve
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    let config = {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    };
    api
      .get(API_URL.PRODUCT_DETAIL + id, config)
      .then((response) => {
        if (response) {
          const { data } = response.data;
          console.log(data);
          setInput({
            name: data.name,
            price: data.price,
            category: data.id_category,
            brand: data.id_brand,
            status: data.status,
            sale: data.sale,
            companyProfile: data.company_profile,
            detail: data.detail,
            avatars: data.image,
          });
          setImage(data.image); // ảnh cũ lấy từ api
          setUserData(data.id_user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    api
      .get(API_URL.CATEGORY_BRAND)
      .then((response) => {
        const { data } = response;
        setCategory(data.category);
        setBrand(data.brand);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategory = () => {
    if (category.length > 0) {
      return category.map((value, key) => {
        return (
          <option value={value.id} key={value.id}>
            {value.category}
          </option>
        );
      });
    }
    return null;
  };

  const hanldeBrand = () => {
    if (brand.length > 0) {
      return brand.map((value, key) => {
        return (
          <option key={key} value={value.id}>
            {value.brand}
          </option>
        );
      });
    }
    return null;
  };

  const handleShowImg = () => {
    if (image.length > 0) {
      return image.map((value, key) => {
        return (
          <li key={key} className="image-item">
            <label className="image-label">
              <img
                className="image-my-product"
                src={`http://localhost/laravel8/public/upload/product/${userData}/${value}`}
                alt="Product Image"
                style={{ width: '100px' }}
              />
              <input
                type="checkbox"
                value={value}
                name="avatarCheckbox"
                onChange={() => handleCheckBox(value)}
                checked={deleteImg.includes(value)}
              />
            </label>
          </li>
        );
      });
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const hanldeFile = (event) => {
    const selectedImg = Array.from(event.target.files);
    const newFiles = [...file, ...selectedImg];
    setFile(newFiles);
    setInput((state) => ({ ...state, avatars: newFiles }));
  };

  const handleCheckBox = (nameImg) => {
    setDeleteImg((prev = []) => {
      if (Array.isArray(prev) && prev.includes(nameImg)) {
        return prev.filter((img) => img !== nameImg);
      } else {
        return [...(prev || []), nameImg];
      }
    });
  };

  const renderSale = () => {
    if (input.status === '0') {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Sale Price"
            name="sale"
            value={input.sale}
            onChange={handleInput}
            style={{ width: 200, marginRight: 10 }}
          />{' '}
          %
        </div>
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tính số ảnh còn lại sau khi xóa
    const remainingOldImages = image.filter((img) => !deleteImg.includes(img));
    const totalImages = remainingOldImages.length + file.length;

    // Kiểm tra nếu không có ảnh nào
    if (totalImages === 0) {
      return;
    }

    const error = validateProduct(input, 'addProduct', file);

    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    } else {
      setError({});

      const token = JSON.parse(localStorage.getItem('token'));
      let config = {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      };

      console.log(file);

      let formData = new FormData();

      formData.append('name', input.name);
      formData.append('price', input.price);
      formData.append('category', input.category);
      formData.append('brand', input.brand);
      formData.append('company', input.companyProfile);
      formData.append('status', input.status);
      formData.append('sale', input.salePrice);
      formData.append('detail', input.detail);

      // khi cần gửi nhiều file ảnh thì cần map
      if (file && file.length > 0) {
        Object.keys(file).forEach((item) => {
          formData.append('file[]', file[item]);
        });
      }

      if (deleteImg && deleteImg.length > 0) {
        Object.keys(deleteImg).forEach((item) => {
          formData.append('avatarCheckBox[]', deleteImg[item]);
        });
      }

      api
        .post(API_URL.EDIT_PRODUCT + id, formData, config)
        .then((res) => {
          if (res) {
            console.log(res);
            toast.success('Cập nhật sản phẩm thành công!');
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error('Có lỗi xảy ra khi cập nhật sản phẩm!');
        });
    }
  };
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Update Product</h2>
        <div className="signup-form">
          <h2>Edit Product!</h2>
          <form action="#" onSubmit={handleSubmit}>
            <label htmlFor="">Name (*)</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={handleInput}
            />
            <label>Price (*)</label>
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={input.price}
              onChange={handleInput}
            />
            <label>Category (*)</label>
            <select
              name="category"
              value={input.category}
              onChange={handleInput}
            >
              <option value="">Please choose Category</option>
              {handleCategory()}
            </select>
            <label>Brand (*)</label>
            <select name="brand" onChange={handleInput} value={input.brand}>
              <option value="">Please choose Brand</option>
              {hanldeBrand()}
            </select>
            <select name="status" onChange={handleInput} value={input.status}>
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
            {renderSale()}
            <label>Compony profile (*)</label>
            <input
              type="text"
              name="companyProfile"
              value={input.companyProfile}
              onChange={handleInput}
            />
            <label>Image (*)</label>
            <input
              type="file"
              id="files"
              name="avatar"
              multiple
              onChange={hanldeFile}
            />
            <ul
              className="img"
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: '0px',
              }}
            >
              {handleShowImg()}
            </ul>
            <br></br>
            <label>Detail (*)</label>
            <textarea
              name="detail"
              placeholder="Detail"
              value={input.detail}
              onChange={handleInput}
            ></textarea>
            <button type="submit" className="btn btn-default">
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditMyProduct;
