import React from 'react';

const ContactPageScreen = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <div>
        <p>
          For any inquiries or support, please reach out to us via email:
        </p>
        <ul>
          <li>
            Email:{' '}
            <a href="mailto:RandomEmail@gmail.com">RandomEmail@gmail.com</a>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>
            Your Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
            Your Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            style={{ padding: '8px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '4px' }}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            style={{ padding: '8px', width: '100%' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPageScreen;