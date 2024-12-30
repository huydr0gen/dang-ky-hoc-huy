// List.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './List.css';  // Import file CSS

const List = () => {
  // State để lưu trữ danh sách các item, input text và trạng thái lỗi hoặc loading
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Hàm gửi dữ liệu và nhận kết quả từ API
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;  // Kiểm tra nếu input trống thì không gửi

    setLoading(true);
    setError(null);

    // Gửi yêu cầu POST tới backend với dữ liệu input
    axios.post('http://localhost:8080/home/course', {maMon:input} )
      .then((response) => {
        setItems(response.data);  // Cập nhật danh sách nhận được từ API
        setLoading(false);
      })
      .catch((err) => {
        setError('Error: ' + err.message);  // Xử lý lỗi nếu có
        setLoading(false);
      });
  };

  return (
    <div className="list-container">
      <h2>List of Processed Items</h2>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to process"
          className="input-text"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Hiển thị trạng thái loading hoặc lỗi */}
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {/* Hiển thị danh sách items trả về */}
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
