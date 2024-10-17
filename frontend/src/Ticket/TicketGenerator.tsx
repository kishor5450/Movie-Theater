import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Card, Image } from "antd";
import { QRCodeCanvas } from "qrcode.react"; // Update this import
import html2canvas from "html2canvas";

const TicketGenerator = () => {
  const [theaterId, setTheaterId] = useState("");
  const [movieId, setMovieId] = useState("");
  const [showTime, setShowTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const handleFetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9001/moviebooking/${theaterId}/${movieId}/${showTime}/${bookingDate}`
      );
      setBookings(response.data);
      setError("");
    } catch (err: any) {
      console.error("Error fetching bookings", err);
      setError("No bookings found or an error occurred.");
      setBookings([]);
    }
  };

  const downloadTicket = (bookingId: string) => {
    const ticketElement = document.getElementById(`ticket-${bookingId}`);
    if (ticketElement) {
      html2canvas(ticketElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `ticket-${bookingId}.png`;
        link.click();
      });
    }
  };

  const renderTickets = () => {
    return bookings.map((booking, index) => (
      <Card
        key={index}
        id={`ticket-${booking.booking_id}`}
        style={{ margin: "20px 0", padding: "10px" }}
        title="Your Ticket"
        extra={
          <Button onClick={() => downloadTicket(booking.booking_id)}>
            Download Ticket
          </Button>
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Movie poster */}
          <Image
            width={80}
            height={100}
            src={`https://example.com/movie-posters/${booking.movie_id}.jpg`} // Replace with actual movie image URL
            alt="Movie Poster"
            style={{ marginRight: "20px" }}
          />
          <div>
            <h3>{booking.movie_name} - {booking.show_type} ({booking.rating})</h3>
            <p>{booking.show_time}</p>
            <p>{booking.booking_date}</p>
            <p>{booking.theater_name}</p>
            <p>{booking.seats}</p>
          </div>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          {/* QR Code */}
          <QRCodeCanvas value={`Booking ID: ${booking.booking_id}`} /> {/* Use QRCodeCanvas */}
          <p>Booking ID: {booking.booking_id}</p>
        </div>
        <div style={{ marginTop: "10px" }}>
          <p>Total Amount: ₹ {booking.total_amount}</p>
        </div>
      </Card>
    ));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Generate Movie Ticket</h2>

      <Input
        placeholder="Enter Theater ID"
        value={theaterId}
        onChange={(e) => setTheaterId(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Enter Movie ID"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Enter Show Time"
        value={showTime}
        onChange={(e) => setShowTime(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input
        placeholder="Enter Booking Date (YYYY-MM-DD)"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={handleFetchBookings}>
        Fetch Bookings
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>{renderTickets()}</div>
    </div>
  );
};

export default TicketGenerator;
