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
          <li>Email: <a href="mailto:RandomEmail@gmail.com">RandomEmail@gmail.com</a></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPageScreen;