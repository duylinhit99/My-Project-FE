import { useEffect, useState } from 'react';
import Errors from '../errors/Errors';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { validate } from '../../utils/validate';
import { toast } from 'react-toastify';
function UpdateMember() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    avatar: '',
    level: 0,
  });

  const [idUser, setIdUser] = useState();

  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  // useEffect là hook dùng để xử lý side effect ( tác vụ phụ ) => thao tác các thao tác bên ngoài trong quá trình render
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('auth'));
    if (userData) {
      setUser({
        name: userData?.name,
        email: userData?.email,
        password: userData?.password,
        address: userData?.address,
        phone: userData?.phone,
        avatar: userData?.avatar,
        level: userData?.level,
      });

      setIdUser(userData?.id || null);
    }
  }, []);

  const handleFile = (event) => {
    const selectedFile = event.target.files;

    let render = new FileReader();
    render.onload = (e) => {
      setAvatar(e.target.result); // data để gửi qua api
      setFile(selectedFile[0]); // luu data cua file ma minh upload len
    };
    render.readAsDataURL(selectedFile[0]);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // gọi validate
    const errors = validate(user, 'updateUser', file);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('password', user.password);
      formData.append('phone', user.phone);
      formData.append('address', user.address);
      formData.append('level', user.level);
      if (file) {
        formData.append('avatar', avatar);
      }
      // call api
      api
        .post(API_URL.UPDATE_ACCOUNT + idUser, formData, config)
        .then((response) => {
          console.log(response);
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            // Update local storage with new user data
            const auth = response.data.Auth;
            const token = response.data.token;

            localStorage.setItem('auth', JSON.stringify(auth));
            localStorage.setItem('token', JSON.stringify(token));
            toast.success('Cập nhật thông tin thành công');
            setErrors({});
          }
        })
        .catch((errors) => {
          console.error('Error updating user:', errors);
          setErrors({ general: 'Cập nhật thông tin thất bại' });
        });
    }
  };
  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>User Update</h2>
        <Errors errors={errors} />
        {avatar && (
          <div style={{ marginBottom: 10 }}>
            <img
              src={avatar}
              alt="preview"
              width="100"
              height="100"
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        )}
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleInput}
          />
          <input
            type="email"
            name="email"
            readOnly
            placeholder="Email Address"
            value={user.email}
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleInput}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleInput}
          />
          <input type="file" name="avatar" id="" onChange={handleFile} />
          <input
            type="number"
            name="level"
            readOnly
            value={user.level}
            placeholder="Level"
          />
          <button type="submit" className="btn btn-default">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMember;
