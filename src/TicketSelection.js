import { useState } from "react";
import "./TicketSelection.css";
import myImage from "./imgs/fav.png";


const TicketSelection = ({ onNext }) => {
  const [selectedTicket, setSelectedTicket] = useState("Free");
  const [ticketCount, setTicketCount] = useState(1);

  const tickets = [
    {
      type: "Free",
      price: "Free",
      description: "REGULAR ACCESS",
      available: "20/52",
    },
    {
      type: "VIP",
      price: "$150",
      description: "VIP ACCESS",
      available: "20/52",
    },
    {
      type: "VVIP",
      price: "$150",
      description: "VVIP ACCESS",
      available: "20/52",
    },
  ];

  const handleNext = () => {
    onNext({ selectedTicket, ticketCount });
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
        {/* Header with Progress Bar */}
        <div className="top">
          <h2 className="title">Ticket Selection</h2>
          <p className="step">Step 1/3</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "30%" }}></div>
        </div>

        {/* Event Details */}
        <div className="event-details">
          <h3 className="event-title">Techember Fest "25</h3>
          <p className="event-description">
            Join us for an unforgettable experience at Techember Fest '25!
            Secure your spot now.
          </p>
          <p className="event-info">
            📍 [Event Name] | March 8, 2025 | 7:00 PM
          </p>
        </div>

        {/* Horizontal Bar */}
        <hr className="divider" />

        {/* Ticket Selection */}
        <div className="ticket-selection">
          <p>Select Ticket Type:</p>
          <div className="ticket-options">
            {tickets.map((ticket) => (
              <button
                key={ticket.type}
                className={`ticket-button ${
                  selectedTicket === ticket.type ? "selected" : ""
                }`}
                onClick={() => setSelectedTicket(ticket.type)}>
                <p className="ticket-price">{ticket.price}</p>
                <p className="ticket-description">{ticket.description}</p>
                <p className="ticket-availability">{ticket.available}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Count */}
        <div className="ticket-count">
          <p>Number of Tickets</p>
          <select
            onChange={(e) => setTicketCount(Number(e.target.value))}
            value={ticketCount}>
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="cancel-button">Cancel</button>
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;

