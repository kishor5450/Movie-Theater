// import React, { useEffect, useState } from "react";
// import '../Booking/Booking.css'
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { QRCodeSVG } from "qrcode.react";
// import axios from "axios";

// // Define the shape of the ticket object
// interface Ticket {
//   theaterName: string;
//   movieName: string;
//   movieId: string;
//   showTime: string;
//   selectedDate: string;
//   seats: string[];
//   qrCodeData: string;
// }

// // Define the props for the component
// interface BookingConfirmationProps {
//   ticket: Ticket | null; // Ticket object is nullable
//   onClose: () => void;   // onClose is a function with no parameters
// }

// // BookingConfirmation Component
// const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ ticket, onClose }) => {
//   const [moviePoster, setMoviePoster] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMoviePoster = async () => {
//       if (ticket) {
//         try {
//           const response = await axios.get(`http://localhost:9001/movies/${ticket.movieId}`);
//           setMoviePoster(response.data.poster_url); // Assuming the poster URL is in the 'poster_url' field
//         } catch (error) {
//           console.error("Error fetching movie data:", error);
//         }
//       }
//     };

//     fetchMoviePoster();
//   }, [ticket]);

//   return (
//     <Dialog open={!!ticket} onClose={onClose}>
//       <DialogTitle>
  
//         <div className="booking-confirmation-header">Booking Confirmation</div>
//         </DialogTitle>
//       <DialogContent>
//         {ticket && (
//           <div className="ticket-main">
//         <div className="ticket-section"  >
//             <div className="tickets">
//               <p>Theater: {ticket.theaterName}</p>
//               <p>Movie: {ticket.movieName}</p>
//               <p>Show Time: {ticket.showTime}</p>
//               <p>Date: {ticket.selectedDate}</p>
//               <p>Seats: {ticket.seats.join(", ")}</p>
//             </div>
//             <div className="ticket-image">
//               {moviePoster && (
//                 <img
//                   src={moviePoster}
//                   alt={ticket.movieName}
//                   style={{
//                     width: "100%",
//                     height: "auto",
//                     marginBottom: "8px",
//                     marginTop: "15px",
//                     padding: "20px",
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//           <div className="qrcode">
//           <QRCodeSVG value={ticket.qrCodeData} size={128} />
//           </div>
          
//             {/* <QRCodeSVG value={ticket.qrCodeData} size={128} /> */}
//           </div>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BookingConfirmation;
import React, { useEffect, useState } from "react";
import '../Booking/Dummy.css'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


interface Ticket {
  theaterName: string;
  movieName: string;
  movieId: string;
  showTime: string;
  selectedDate: string;
  seats: string[];
  qrCodeData: string;
}


interface BookingConfirmationProps {
  ticket: Ticket | null; 
  onClose: () => void;   
}


const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ ticket, onClose }) => {
  const [moviePoster, setMoviePoster] = useState<string | null>(null);
  const logoUrl = "https://latestlogo.com/wp-content/uploads/2024/03/bookmyshow.svg"
  useEffect(() => {
    const fetchMoviePoster = async () => {
      if (ticket) {
        try {
          const response = await axios.get(`http://localhost:9001/movies/${ticket.movieId}`);
          setMoviePoster(response.data.poster_url);
        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      }
    };

    fetchMoviePoster();
  }, [ticket]);

  
  const handleDownloadTicket = async () => {
    const input = document.getElementById("ticket-content");
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF(); 
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 15, 15, imgWidth, imgHeight);
      pdf.save("ticket.pdf");
    }
  };

  return (
    <Dialog open={!!ticket} onClose={onClose}>
      <DialogTitle>
        <div className="booking-confirmation-header">Booking Confirmation</div>
        <div className="ticket-logo" style={{ textAlign: "left", marginBottom: "-25px" }}>
                <img src={logoUrl} alt="Logo" style={{ maxWidth: "80px", height: "auto" }} />
              </div>
      </DialogTitle>
      <DialogContent>
        {ticket && (
          <div id="ticket-content" className="ticket-main">
            <div className="ticket-section">
           
              <div className="tickets" style={{marginTop:-25}}>
              <h2>Movie: {ticket.movieName}</h2>
              <h6>English 3D</h6>
                <p> {ticket.theaterName},vizag</p>
                {/* <p>Movie: {ticket.movieName}</p> */}
                <p>Show Time: {ticket.showTime}</p>
                <p>Date: {ticket.selectedDate}</p>
                <p>Seats: {ticket.seats.join(", ")}</p>
    
              </div>
              <div className="ticket-image">
                {moviePoster && (
                  <img
                    src={moviePoster}
                    alt={ticket.movieName}
                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "8px",
                      marginTop: "15px",
                      padding: "20px",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="qrcode">
              <QRCodeSVG value={ticket.qrCodeData} size={128} />
            </div>
            <h6>Ticket(s)</h6>
            <div className="cancel">
            <h5>Cancellation not availble for this  venue</h5>
            </div>
           
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {ticket && (
          <Button onClick={handleDownloadTicket} color="primary">
            Download Ticket
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BookingConfirmation;

