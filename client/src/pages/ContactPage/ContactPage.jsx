import React, { useState, useRef } from "react";
import Kurt from '../../assets/KurtProfile.png'
import Graham from '../../assets/GrahamProfile.png'
import Tessa from '../../assets/TessaProfile.png'
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
    <div className="about-contact">
    <div className="about">
      <h1>About Us</h1>
      <h2>Graham Freundlich</h2>
      <div className="profile-info">
      <img src={Graham} alt="Graham Freundlich" className="profile-picture"></img>
      <p className="bio">Born and raised in Boston, MA, Graham is an avid sports fan and a video gamer. He sparked an 
        interest in coding in May of 2022 after looking over some code and has been coding ever since. 
        His favorite horror movie from the 80's is Pet Sematary.</p>
      </div>
      <h2>Tessa Pixler</h2>
      <div className="profile-info">
      <img src={Tessa} alt="Tessa Pixler" className="profile-picture"></img>
      <p className="bio">Tessa has lived in the same town in Texas all her life (most of that living in the house 
        she grew up in.) She is a wife and a mom of 7! She loves gardening, cooking, crocheting 
        and knitting. She likes to create things and watch them grow, which is how she came to 
        love being a Web Developer. She has always had passion for coding after she took some 
        classes in high school. Her favorite horror movie from the 80's is Gremlins, so much so that she named her 
        cat Gizmo.</p>
      </div>
      <h2>Kurt Wehde</h2>
      <div className="profile-info">
      <img src={Kurt} alt="Kurt Wehde" className="profile-picture"></img>
      <p className="bio">Kurt is a New Hampshire native living in Bozeman, Montana. His hobbies include skiiing, 
        mountain biking, trail running, and photography. His passion for website design and coding
        began in 2015 right after graduating college and working with a variety of websites across 
        careers at Mount Sunapee Resort and Dartmouth College. His favorite 80's horror movie is
        definitely "The Thing" and refuses to acknowledge the modern remake!
      </p>
      </div>
    </div>
    <div className="contact">
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
    </div>
  );
}

export default ContactForm;

