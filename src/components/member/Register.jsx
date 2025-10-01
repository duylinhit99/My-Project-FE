import { useState } from 'react';
import Errors from '../errors/Errors';
import api from '../../api';
import API_URL from '../../api/API_URL';
import { toast } from 'react-toastify';
import { validate } from '../../utils/validate';

function Register() {
  const [inputs, setInput] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    avatar: '',
    level: 0,
  });

  const [avatar, setAvatar] = useState();
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});

  const handleFile = (event) => {
    const file = event.target.files;

    // send file to api server
    let render = new FileReader();
    render.onload = (e) => {
      setAvatar(e.target.result); //gui qua api
      setFile(file[0]); // luu toan bo thong tin hinh anh de xu ly
    };

    render.readAsDataURL(file[0]);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInput((state) => ({ ...state, [name]: value }));
  };

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // chặn không cho submit mặc định của trình duyệt

    const error = validate(inputs, 'register', file);

    if (Object.keys(error).length > 0) {
      setErrors(errorSubmit);
    } else {
      setErrors({});
      const data = {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        phone: inputs.phone,
        address: inputs.address,
        avatar: avatar,
        level: 0,
      };
      if (data) {
        api
          .post(API_URL.REGISTER, data)
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>New User Signup!</h2>
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
            onChange={handleInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
            onChange={handleInput}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleInput}
          />
          <input type="file" name="avatar" id="" onChange={handleFile} />
          <input
            type="number"
            name="level"
            readOnly
            value={inputs.level}
            placeholder="Level"
          />
          <button type="submit" className="btn btn-default">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
