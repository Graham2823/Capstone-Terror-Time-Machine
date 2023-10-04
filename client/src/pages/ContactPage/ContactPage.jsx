import React, { useState, useRef } from "react";
import "./ContactPage.css";

function ContactForm() {
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailSubmit = () => {
    const mailtoUrl = `mailto:terrortimemachinecapstone@gmail.com?subject=Contact Us&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset();
    setMessage("");
    setFormData({ name: "", email: "", message: "" });
    console.log(formData);
  };

  return (
    <>
    <div className="container">
      <div className="bg-image">
        <h1>Contact Us</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input className="contact-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <br />
          <br />

          <label htmlFor="email">Email: </label>
          <input className="contact-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <br />
          <br />

          <label htmlFor="message">Message: </label>
          <br />
          <textarea className="contact-textarea"
            id="message"
            name="message"
            rows="5"
            cols="40"
            value={message}
            onChange={handleMessageChange}
            required
          ></textarea>
          <br />
          <br />
          <button id="button" onClick={handleEmailSubmit}>
            Send Message
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ContactForm;

