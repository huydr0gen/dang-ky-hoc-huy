import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import email_icons from '../Assets/email.png';
import password_icons from '../Assets/password.png';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password
      });

      if (response.data.success) {
        // Chuyển hướng tới trang /home sau khi đăng nhập thành công
        navigate('/home');
      } else {
        setErrorMessage('Tên đăng nhập hoặc mật khẩu sai.');
      }
    } catch (error) {
      setErrorMessage('Lỗi kết nối đến server.');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icons} alt="Email Icon" />
          <input
            type="email"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={password_icons} alt="Password Icon" />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="login" onClick={handleSubmit}>
        Login
      </div>
      {errorMessage && <p className="message">{errorMessage}</p>} {/* Hiển thị thông báo */}
    </div>
  );
};

export default Login;