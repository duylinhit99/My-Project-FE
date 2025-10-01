import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import API_URL from '../../api/API_URL';
import Errors from '../errors/Errors';
import { validate } from '../../utils/validate';
function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;

    setInputs((state) => ({
      ...state, // giữ lại dữ liệu cũ
      [name]: value, // cập nhật field mới
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const error = validate(inputs, 'register');

    if (Object.keys(error).length > 0) {
      setErrors(error);
    } else {
      setErrors({});

      const data = {
        email: inputs.email,
        password: inputs.password,
        level: 0,
      };

      api
        .post(API_URL.LOGIN, data)
        .then((res) => {
          if (res) {
            console.log(res);
            localStorage.setItem('auth', JSON.stringify(res.data.Auth));
            localStorage.setItem('token', JSON.stringify(res.data.token));

            localStorage.setItem('login', true);
            toast.success('Đăng nhập thành công!');

            navigate('/');
          }
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };
  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        <h2>Login to your account</h2>
        <Errors errors={errors} />
        <form action="#" onSubmit={handleSubmit}>
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
          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
