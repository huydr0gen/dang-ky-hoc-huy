import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [studentIdField, setstudentIdField] = useState(''); // Trường nhập liệu 1
  const [CourseIdField, setCourseIdField] = useState(''); // Trường nhập liệu 2
  const [message, setMessage] = useState(''); // Thông báo hiển thị

  // Hàm xử lý khi nhấn nút "Check"
  const handleCheck = async () => {
    try {
      // Gửi dữ liệu tới backend
      const response = await axios.post('http://localhost:8080/home/register', {
        msv: studentIdField,
        maMon: CourseIdField,
      });

      // Kiểm tra kết quả trả về từ backend
      if (response.data) {
        setMessage('Có thể đăng ký');
      } else {
        setMessage('Không đủ điều kiện đăng ký');
      }
    } catch (error) {
      console.error('Lỗi khi kết nối đến backend:', error);
      setMessage('Lỗi kết nối đến server');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">Kiểm tra đăng ký môn</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder='Mã sinh viên'
            value={studentIdField}
            onChange={(e) => setstudentIdField(e.target.value)}
          />
        </div>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="email"
            placeholder='Mã môn'
            value={CourseIdField}
            onChange={(e) => setCourseIdField(e.target.value)}
          />
        </div>
      </div>
      <div className="login" onClick={handleCheck}>
        Kiểm Tra
      </div>
      {message && <div className={`message ${setMessage}`}>{message}</div>}
    </div>
  );
};

export default Home;