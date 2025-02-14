import { useState, useEffect } from "react";
import "./AttendeeDetails.css";
import myImage from "./imgs/fav.png";

const CLOUDINARY_UPLOAD_PRESET = "sample"; // Replace with your Cloudinary preset
const CLOUDINARY_CLOUD_NAME = "dzluyvcdr"; // Replace with your Cloudinary cloud name
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const AttendeeDetails = ({ onNext, onBack }) => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "hello@aviolagos.io"
  );
  const [specialRequest, setSpecialRequest] = useState(
    localStorage.getItem("specialRequest") || ""
  );
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null
  );
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("specialRequest", specialRequest);
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    }
  }, [name, email, specialRequest, profileImage]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setProfileImage(data.secure_url);
        localStorage.setItem("profileImage", data.secure_url);
      } else {
        alert("Image upload failed. Try again.");
      }
    } catch (error) {
      alert("Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!profileImage) {
      newErrors.profileImage = "Profile image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({ name, email, specialRequest, profileImage });
    }
  };

  return (
    <div className="container">
      <nav className="nav-bar">
        <div className="logo">
          <span className="icon">
            <img src={myImage} alt="logo" width="100" height="30" />
          </span>
          <span className="brand"></span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#events">Events</a>
          </li>
          <li>
            <a href="#tickets">My Tickets</a>
          </li>
          <li>
            <a href="#about">About Project</a>
          </li>
        </ul>
        <button className="myTicket-button">MY TICKETS →</button>
      </nav>
      <div className="card">
        <div className="top">
          <h2 className="title">Attendee Details</h2>
          <p className="step">Step 2/3</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "60%" }}></div>
        </div>

        <div className="upload-section">
          <p>Upload Profile Photo</p>
          <label className="upload-box">
            {uploading ? (
              <p>Uploading...</p>
            ) : profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="profile-preview"
              />
            ) : (
              <span>Drag & drop or click to upload</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
          {errors.profileImage && (
            <p className="error-text">{errors.profileImage}</p>
          )}
        </div>

        <hr className="divider" />

        <div className="input-group">
          <label>Enter your Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label>Enter your Email *</label>
          <div className="email-input">
            <span className="email-icon">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label>Special request?</label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}></textarea>
        </div>

        <div className="button-group">
          <button className="back-button" onClick={onBack}>
            Back
          </button>
          <button className="next-button" onClick={handleNext}>
            Get My Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
