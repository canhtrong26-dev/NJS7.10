'use client';
import { useState, useEffect } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => {
        const token = res.headers.get('x-csrf-token');
        setCsrfToken(token);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <div>
      <h1>Liên hệ</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Tên" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <textarea name="message" placeholder="Tin nhắn" onChange={handleChange} />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}