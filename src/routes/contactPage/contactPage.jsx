import { useState } from "react";
import "./contactPage.scss";

function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // here just simulate a successful submission
    setShowPopup(true);

    // Hide the popup after a few seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // 3 seconds
  };

  return (
    <div className="contactPage">
      <div className="textContainer">
        <div className="wrapper">
          {showPopup && <div className="popup">Email sent successfully!</div>}
          <h3 className="title">Contact Us</h3>
          {/* Contact Form */}
          <form className="contactForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="formGroup">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/logo.png" alt="" />
      </div>
    </div>
  );
}

export default ContactPage;
