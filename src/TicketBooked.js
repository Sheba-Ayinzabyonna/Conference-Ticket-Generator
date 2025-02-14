import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./TicketBooked.css";
import myImage from "./imgs/fav.png";

const TicketBooked = ({ attendeeDetails, onBookAnotherTicket }) => {
  if (!attendeeDetails) {
    return <p>Loading...</p>;
  }

  const { name, email, profileImage, ticketType, ticketCount, specialRequest } =
    attendeeDetails;

  const ticketRef = useRef(null);

  const handleDownload = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
      pdf.save(`${name}_ticket.pdf`);
    });
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
      <div className="card" ref={ticketRef}>
        <div className="top">
          <h2 className="title">Ready</h2>
          <p className="step">Step 3/3</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "100%" }}></div>
        </div>

        <h3 className="confirmation">Your Ticket is Booked!</h3>
        <p className="description">
          Check your email for a copy or{" "}
          <span className="download">download</span>
        </p>

        <div className="ticket">
          <h3 className="event-title">Techember Fest '25</h3>
          <p className="event-location">📍 04 Kampala Road, Uganda</p>
          <p className="event-date">📅 March 15, 2025 | 7:00 PM</p>

          <div className="profile-image">
            <img
              src={profileImage || "https://via.placeholder.com/100"}
              alt="Profile"
            />
          </div>

          <div className="ticket-container">
            <div className="ticket-table">
              <div className="row">
                <div className="cell header">Enter your name</div>
                <div className="cell header">Enter your email *</div>
              </div>
              <div className="row">
                <div className="cell bold">{name}</div>
                <div className="cell bold">{email}</div>
              </div>
              <div className="row">
                <div className="cell header">Ticket Type:</div>
                <div className="cell header">Ticket for:</div>
              </div>
              <div className="row">
                <div className="cell bold">{ticketType}</div>
                <div className="cell bold">{ticketCount}</div>
              </div>
              <div className="row">
                <div className="cell header">Special request?</div>
              </div>
              <div className="row">
                <div className="cell full bold">{specialRequest || "N/A"}</div>
              </div>
            </div>
          </div>


          <div className="mt-6 flex justify-center">
            <div className="bg-white w-40 h-8 flex justify-center items-center">
              <span className="text-black text-xs tracking-widest">
                | | | || ||| |||| |||
              </span>
              <p>234567 891026</p>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="back-button" onClick={onBookAnotherTicket}>
            Book Another Ticket
          </button>
          <button className="download-button" onClick={handleDownload}>
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketBooked;

