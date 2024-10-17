// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Layout, Typography, Spin, Modal } from "antd";
// import "../layout-components/FSeat.css";

// const { Content } = Layout;
// const { Title } = Typography;

// const getRowLabel = (index: number): string => String.fromCharCode(65 + index);

// interface SeatData {
//   t_rows: number;
//   t_columns: number;
// }

// interface NonSeatingSpace {
//   trow_number: number;
//   cell_indexes: string;
// }

// interface FetchedSeatLayoutProps {
//   theaterId: string;
// }

// const FetchedSeatLayout: React.FC<FetchedSeatLayoutProps> = ({ theaterId }) => {
//   const [seatsData, setSeatsData] = useState<SeatData | null>(null);
//   const [nonSeatingSpaces, setNonSeatingSpaces] = useState<NonSeatingSpace[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const seatsResponse = await axios.get<SeatData>(
//           `http://localhost:9001/theater_seats/${theaterId}`
//         );

//         const nonSeatingResponse = await axios.get<NonSeatingSpace[]>(
//           `http://localhost:9001/non_seating_space/${theaterId}`
//         );

//         setSeatsData(seatsResponse.data);
//         setNonSeatingSpaces(nonSeatingResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Error fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [theaterId]);

//   const handleModalOpen = () => {
//     setIsModalVisible(true);
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//   };

//   if (loading) {
//     return (
//       <Layout className="layout">
//         <Content>
//           <Spin />
//         </Content>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout className="layout">
//         <Content>
//           <Title level={3}>{error}</Title>
//         </Content>
//       </Layout>
//     );
//   }

//   if (!seatsData || !seatsData.t_rows || !seatsData.t_columns) {
//     return (
//       <Layout className="layout">
//         <Content>
//           <Title level={3}>No seat layout available for this theater.</Title>
//         </Content>
//       </Layout>
//     );
//   }

//   const rows = seatsData.t_rows;
//   const columns = seatsData.t_columns;

//   const allSeats = Array.from({ length: rows }, (_, row) =>
//     Array.from({ length: columns }, (_, col) => `${getRowLabel(row)}${col + 1}`)
//   );

//   const nonSeatingSet = new Set(
//     nonSeatingSpaces.flatMap((space) => {
//       const row = getRowLabel(space.trow_number - 1);
//       const cellIndexes = space.cell_indexes.split(",").map(Number);
//       return cellIndexes.map((colIndex) => `${row}${colIndex}`);
//     })
//   );

//   const handleSeatClick = (seat: string): void => {
//     if (nonSeatingSet.has(seat)) {
//       return; 
//     }

//     setSelectedSeats((prevSelectedSeats) =>
//       prevSelectedSeats.includes(seat)
//         ? prevSelectedSeats.filter((s) => s !== seat)
//         : [...prevSelectedSeats, seat]
//     );
//   };

//   return (
//     <Layout className="layout">
//       <Content>
//         <Title level={3}>Seating Layout</Title>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: `repeat(${columns}, 50px)`,
//             gap: "5px",
//           }}
//         >
//           {allSeats.flat().map((seat) => (
//             <div
//               key={seat}
//               className={`seat ${
//                 nonSeatingSet.has(seat)
//                   ? "non-seating"
//                   : selectedSeats.includes(seat)
//                   ? "selected"
//                   : "available"
//               }`}
//               onClick={() => handleSeatClick(seat)}
//             >
//               {seat}
//             </div>
//           ))}
//         </div>
//         {/* Modal to show selected seats */}
//         <Modal
//           open={isModalVisible}
//           onCancel={handleModalClose}
//           footer={null}
//         >
//           <Title level={4}>Selected Seats</Title>
//           <div>{selectedSeats.join(", ") || "No seats selected."}</div>
//         </Modal>
//       </Content>
//     </Layout>
//   );
// };

// export default FetchedSeatLayout;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Layout, Typography, Spin, Button, message } from "antd";
// import "../layout-components/FSeat.css";

// const { Content } = Layout;
// const { Title } = Typography;

// const getRowLabel = (index: number): string => String.fromCharCode(65 + index);

// const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
//   const dates: string[] = [];
//   const currentDate = new Date(startDate);
//   currentDate.setDate(currentDate.getDate() + 1);
//   currentDate.setHours(0, 0, 0, 0); // Set time to 00:00 to avoid time zone issues
//   const end = new Date(endDate);
//   end.setDate(end.getDate() + 1); // Add +1 to include the end date
//   end.setHours(0, 0, 0, 0); // Set time to 00:00 to avoid time zone issues

//   while (currentDate <= end) {
//     dates.push(currentDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

// interface FetchedSeatLayoutProps {
//   theaterId: number;
//   movieId: number;
//   theaterName: string;
//   movieName: string;
//   onClose: () => void;
// }

// interface SeatsData {
//   t_rows: number;
//   t_columns: number;
// }

// interface NonSeatingSpace {
//   seat: string;
// }

// const FetchedSeatLayout: React.FC<FetchedSeatLayoutProps> = ({
//   theaterId,
//   movieId,
//   theaterName,
//   movieName,
//   onClose,
// }) => {
//   const [seatsData, setSeatsData] = useState<SeatsData | null>(null);
//   const [nonSeatingSpaces, setNonSeatingSpaces] = useState<NonSeatingSpace[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [movieDates, setMovieDates] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [dateOptions, setDateOptions] = useState<Date[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const seatsResponse = await axios.get<SeatsData>(
//           `http://localhost:9001/theater_seats/${theaterId}`
//         );
//         setSeatsData(seatsResponse.data);

//         const nonSeatingResponse = await axios.get<NonSeatingSpace[]>(
//           `http://localhost:9001/non_seating_space/${theaterId}`
//         );
//         setNonSeatingSpaces(nonSeatingResponse.data);

//         const datesResponse = await axios.get<{
//           start_date: string;
//           end_date: string;
//         }>(`http://localhost:9001/theaters-movies/${theaterId}/${movieId}`);

//         const { start_date, end_date } = datesResponse.data;
//         if (start_date && end_date) {
//           const allDates = getDatesInRange(new Date(start_date), new Date(end_date));
//           setMovieDates(allDates);
//           setDateOptions(allDates.map((date) => new Date(date)));
//         } else {
//           console.warn("No valid start_date or end_date returned from API.");
//         }
//       } catch (error: any) {
//         console.error(
//           "Error fetching data:",
//           error.response ? error.response.data : error.message
//         );
//         setError("Error fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [theaterId, movieId]);

//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date.toISOString().split("T")[0]);
//     setSelectedSeats([]);
//   };

//   const handleSeatClick = (seat: string) => {
//     if (nonSeatingSpaces.some((space) => space.seat === seat)) {
//       return; 
//     }
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   const handleBookingSave = async () => {
//     if (!selectedDate || selectedSeats.length === 0) {
//       message.error("Please select a date and at least one seat.");
//       return;
//     }

//     const bookingData = {
//       theater_id: theaterId,
//       theater_name: theaterName,
//       movie_id: movieId,
//       movie_name: movieName,
//       bookingdate: selectedDate,
//       seats: JSON.stringify(selectedSeats),
//     };

//     try {
//       await axios.post("http://localhost:9001/moviebooking", bookingData);
//       message.success("Booking saved successfully.");
//       onClose(); 
//     } catch (error) {
//       message.error("Error saving booking.");
//     }
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   if (error) {
//     return <Title level={3}>{error}</Title>;
//   }

//   if (!seatsData || !seatsData.t_rows || !seatsData.t_columns) {
//     return <Title level={3}>No seat layout available.</Title>;
//   }

//   const rows = seatsData.t_rows;
//   const columns = seatsData.t_columns;

//   const allSeats = Array.from({ length: rows }, (_, row) =>
//     Array.from({ length: columns }, (_, col) => `${getRowLabel(row)}${col + 1}`)
//   );

//   return (
//     <Layout className="layout">
//       <Content>
//         <Title level={3}>Seating Layout</Title>

//         <div className="date-picker-container">
//           <button className="scroll-button prev" /* Add logic to scroll left */>
//             &lt;
//           </button>

//           <div className="date-picker">
//             {dateOptions.length > 0 ? (
//               dateOptions.map((date) => {
//                 const dateString = date.toISOString().split("T")[0];
//                 const day = date.getDate();
//                 const isToday =
//                   dateString === new Date().toISOString().split("T")[0];

//                 return (
//                   <button
//                     key={dateString}
//                     className={`date-button ${
//                       selectedDate === dateString ? "selected" : ""
//                     } ${isToday ? "today" : ""}`}
//                     onClick={() => handleDateChange(date)}
//                   >
//                     <span className="day">{day}</span>
//                     <span className="month">
//                       {date.toLocaleString("default", { month: "short" })}
//                     </span>
//                   </button>
//                 );
//               })
//             ) : (
//               <Title level={4}>No available dates</Title>
//             )}
//           </div>

//           <button
//             className="scroll-button next" /* Add logic to scroll right */
//           >
//             &gt;
//           </button>
//         </div>

//         <div className="seating-layout">
//           {allSeats.map((row, rowIndex) => (
//             <div key={rowIndex} className="seating-row">
//               {row.map((seat) => (
//                 <Button
//                   key={seat}
//                   className={`seat ${
//                     selectedSeats.includes(seat) ? "selected" : ""
//                   } ${
//                     nonSeatingSpaces.some((space) => space.seat === seat)
//                       ? "non-seating"
//                       : ""
//                   }`}
//                   onClick={() => handleSeatClick(seat)}
//                   disabled={nonSeatingSpaces.some(
//                     (space) => space.seat === seat
//                   )} 
//                 >
//                   {seat}
//                 </Button>
//               ))}
//             </div>
//           ))}
//         </div>

//         <Button
//           type="primary"
//           onClick={handleBookingSave}
//           style={{ marginTop: 16 }}
//         >
//           Save Booking
//         </Button>
//       </Content>
//     </Layout>
//   );
// };

// export default FetchedSeatLayout;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Layout, Typography, Spin, Button, message } from "antd";
// import "../layout-components/FSeat.css";

// const { Content } = Layout;
// const { Title } = Typography;


// interface FetchedSeatLayoutProps {
//   theaterId: string;
//   movieId: string;
//   theaterName: string;
//   movieName: string;
//   onClose: () => void;
// }

// const getRowLabel = (index: number): string => String.fromCharCode(65 + index);

// const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
//   const dates: string[] = [];
//   const currentDate = new Date(startDate);
//   currentDate.setDate(currentDate.getDate() + 1); 
//   currentDate.setHours(0, 0, 0, 0);
//   const end = new Date(endDate);
//   end.setDate(end.getDate() + 1);
//   end.setHours(0, 0, 0, 0);

//   while (currentDate <= end) {
//     dates.push(currentDate.toISOString().split("T")[0]);
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

// const FetchedSeatLayout: React.FC<FetchedSeatLayoutProps> = ({
//   theaterId,
//   movieId,
//   theaterName,
//   movieName,
//   onClose,
// }) => {
//   const [seatsData, setSeatsData] = useState<any>(null);
//   const [nonSeatingSpaces, setNonSeatingSpaces] = useState<any[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [bookedSeats, setBookedSeats] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [movieDates, setMovieDates] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [dateOptions, setDateOptions] = useState<Date[]>([]);

  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const seatsResponse = await axios.get(
//           `http://localhost:9001/theater_seats/${theaterId}`
//         );
//         setSeatsData(seatsResponse.data);

//         const nonSeatingResponse = await axios.get(
//           `http://localhost:9001/non_seating_space/${theaterId}`
//         );
//         setNonSeatingSpaces(nonSeatingResponse.data);

//         const datesResponse = await axios.get(
//           `http://localhost:9001/theaters-movies/${theaterId}/${movieId}`
//         );

//         const { start_date, end_date } = datesResponse.data;
//         if (start_date && end_date) {
//           const allDates = getDatesInRange(new Date(start_date), new Date(end_date));
//           setMovieDates(allDates);
//           setDateOptions(allDates.map((date) => new Date(date)));
//         } else {
//           console.warn("No valid start_date or end_date returned from API.");
//         }
//       } catch (error: unknown) {
//         setError("Error fetching data.");
//         if (axios.isAxiosError(error) && error.response) {
//           console.error("Error fetching data:", error.response.data);
//         } else {
//           console.error("Error fetching data:", error);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [theaterId, movieId]);


//   useEffect(() => {
//     const fetchBookedSeats = async () => {
//       if (selectedDate) {
//         try {
//           const response = await axios.get(
//             `http://localhost:9001/moviebooking/${theaterId}/${movieId}/${selectedDate}`
//           );
//           const bookedSeatsData = response.data.map((booking: any) =>
//             JSON.parse(booking.seats)
//           ); 
//           const flattenedBookedSeats = bookedSeatsData.flat();
//           setBookedSeats(flattenedBookedSeats);
//           console.log("Already booked seats:", flattenedBookedSeats);
//         } catch (error) {
//           console.error("Error fetching booked seats:", error);
//           setBookedSeats([]);
//         }
//       }
//     };

//     fetchBookedSeats();
//   }, [selectedDate, theaterId, movieId]);

  
//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date.toISOString().split("T")[0]);
//     setSelectedSeats([]); 
//   };

  
//   const handleSeatClick = (seat: string) => {
//     if (
//       nonSeatingSpaces.some((space) =>
//         space.cell_indexes.split(",").includes(seat)
//       ) ||
//       bookedSeats.includes(seat) 
//     ) {
//       return; 
//     }
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

  
//   const handleBookingSave = async () => {
//     if (!selectedDate || selectedSeats.length === 0) {
//       message.error("Please select a date and at least one seat.");
//       return;
//     }

//     const bookingData = {
//       theater_id: theaterId,
//       theater_name: theaterName,
//       movie_id: movieId,
//       movie_name: movieName,
//       bookingdate: selectedDate,
//       seats: JSON.stringify(selectedSeats),
//     };

//     try {
//       await axios.post("http://localhost:9001/moviebooking", bookingData);
//       message.success("Booking saved successfully.");

      
//       setBookedSeats((prev) => [...prev, ...selectedSeats]);

//       onClose();
//     } catch (error) {
//       message.error("Error saving booking.");
//       console.error("Error saving booking:", error);
//     }
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   if (error) {
//     return <Title level={3}>{error}</Title>;
//   }

//   if (!seatsData || !seatsData.t_rows || !seatsData.t_columns) {
//     return <Title level={3}>No seat layout available.</Title>;
//   }

//   const rows = seatsData.t_rows;
//   const columns = seatsData.t_columns;

//   const allSeats = Array.from({ length: rows }, (_, row) =>
//     Array.from({ length: columns }, (_, col) => `${getRowLabel(row)}${col + 1}`)
//   );

  
//   const availableSeats = allSeats
//     .flat()
//     .filter(
//       (seat) =>
//         !bookedSeats.includes(seat) &&
//         !nonSeatingSpaces.some((space) =>
//           space.cell_indexes.split(",").includes(seat)
//         )
//     );

//   return (
//     <Layout className="layout">
//       <Content>
//         <Title level={3}>Seating Layout</Title>

//         <div className="date-picker-container">
//           <button className="scroll-button prev">
//             {/* Scroll left logic */}&lt;
//           </button>

//           <div className="date-picker">
//             {dateOptions.length > 0 ? (
//               dateOptions.map((date) => {
//                 const dateString = date.toISOString().split("T")[0];
//                 const day = date.getDate();
//                 const isToday =
//                   dateString === new Date().toISOString().split("T")[0];

//                 return (
//                   <button
//                     key={dateString}
//                     className={`date-button ${
//                       selectedDate === dateString ? "selected" : ""
//                     } ${isToday ? "today" : ""}`}
//                     onClick={() => handleDateChange(date)}
//                   >
//                     <span className="day">{day}</span>
//                     <span className="month">
//                       {date.toLocaleString("default", { month: "short" })}
//                     </span>
//                   </button>
//                 );
//               })
//             ) : (
//               <Title level={4}>No available dates</Title>
//             )}
//           </div>

//           <button className="scroll-button next">
//             {/* Scroll right logic */}&gt;
//           </button>
//         </div>

//         <div className="seating-layout">
//           {allSeats.map((row, rowIndex) => (
//             <div key={rowIndex} className="seating-row">
//               {row.map((seat) => {
//                 const isNonSeating = nonSeatingSpaces.some((space) =>
//                   space.cell_indexes.split(",").includes(seat)
//                 );
//                 const isBooked = bookedSeats.includes(seat); 
//                 const isAvailable = availableSeats.includes(seat);
//                 const isSelected = selectedSeats.includes(seat);

//                 return (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       isNonSeating
//                         ? "non-seating"
//                         : isBooked
//                         ? "booked"
//                         : isSelected
//                         ? "selected"
//                         : isAvailable
//                         ? "available"
//                         : ""
//                     }`}
//                     onClick={() => handleSeatClick(seat)}
//                     disabled={isNonSeating || isBooked} 
//                   >
//                     {seat}
//                   </button>
//                 );
//               })}
//             </div>
//           ))}
//         </div>

//         <Button type="primary" onClick={handleBookingSave}>
//           Save Booking
//         </Button>
//         <Button type="default" onClick={onClose}>
//           Cancel
//         </Button>
//       </Content>
//     </Layout>
//   );
// };

// export default FetchedSeatLayout;
// src/layout-components/FetchedSeatLayout.tsx

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Layout, Typography, Spin, Button, message } from "antd";
// import "../layout-components/FSeat.css";
// // import "../CSS/Dummy.css"
// // import '../layout-components/Gimini.css';


// const { Content } = Layout;
// const { Title } = Typography;

// interface FetchedSeatLayoutProps {
//   theaterId: string;
//   movieId: string;
//   theaterName: string;
//   movieName: string;
//   showTime: string; 
//   onClose: () => void;
// }

// const getRowLabel = (index: number): string => String.fromCharCode(65 + index);


// const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
//   const dates: string[] = [];
//   const currentDate = new Date(startDate);
//   currentDate.setDate(currentDate.getDate() + 1);
//   currentDate.setHours(0, 0, 0, 0);
//   const end = new Date(endDate);
//   end.setDate(end.getDate() + 1);
//   end.setHours(0, 0, 0, 0);

//   while (currentDate <= end) {
//     dates.push(currentDate.toISOString().split("T")[0]);
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

// const FetchedSeatLayout: React.FC<FetchedSeatLayoutProps> = ({
//   theaterId,
//   movieId,
//   theaterName,
//   movieName,
//   showTime, 
//   onClose,
// }) => {
//   const [seatsData, setSeatsData] = useState<any>(null);
//   const [nonSeatingSpaces, setNonSeatingSpaces] = useState<any[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [bookedSeats, setBookedSeats] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [movieDates, setMovieDates] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
        
//         const seatsResponse = await axios.get(
//           `http://localhost:9001/theater_seats/${theaterId}`
//         );
//         setSeatsData(seatsResponse.data);

        
//         const nonSeatingResponse = await axios.get(
//           `http://localhost:9001/non_seating_space/${theaterId}`
//         );
//         setNonSeatingSpaces(nonSeatingResponse.data);

        
//         const datesResponse = await axios.get(
//           `http://localhost:9001/theaters-movies/${theaterId}/${movieId}`
//         );
//         const { start_date, end_date } = datesResponse.data;
//         if (start_date && end_date) {
//           const allDates = getDatesInRange(new Date(start_date), new Date(end_date));
//           setMovieDates(allDates);
//         }
//       } catch (error: unknown) {
//         setError("Error fetching data.");
//         if (axios.isAxiosError(error)) {
//           console.error("Error fetching data:", error.response?.data || error.message);
//         } else {
//           console.error("Error fetching data:", error);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [theaterId, movieId]);

//   useEffect(() => {
//     const fetchBookedSeats = async () => {
//       if (selectedDate && showTime) {
//         try {
//           const response = await axios.get(
//             `http://localhost:9001/moviebooking/${theaterId}/${movieId}/${showTime}/${selectedDate}`
//           );
//           const bookedSeatsData = response.data.map((booking: any) =>
//             JSON.parse(booking.seats)
//           );
//           const flattenedBookedSeats = bookedSeatsData.flat();
//           setBookedSeats(flattenedBookedSeats);
//         } catch (error) {
//           console.error("Error fetching booked seats:", error);
//           setBookedSeats([]);
//         }
//       }
//     };
//     fetchBookedSeats();
//   }, [selectedDate, showTime, theaterId, movieId]);

//   const handleDateChange = (date: string) => {
//     setSelectedDate(date);
//     setSelectedSeats([]);
//   };

//   const handleSeatClick = (seat: string) => {
//     if (
//       nonSeatingSpaces.some((space) =>
//         space.cell_indexes.split(",").includes(seat)
//       ) ||
//       bookedSeats.includes(seat)
//     ) {
//       return;
//     }
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   const handleBookingSave = async () => {
//     if (!selectedDate || !selectedSeats.length || !showTime) {
//       message.error("Please select a date, at least one seat, and a show time.");
//       return;
//     }

//     const bookingData = {
//       theater_id: theaterId,
//       theater_name: theaterName,
//       movie_id: movieId,
//       movie_name: movieName,
//       bookingdate: selectedDate,
//       show_time: showTime,
//       seats: JSON.stringify(selectedSeats),
//     };

//     try {
//       await axios.post("http://localhost:9001/moviebooking", bookingData);
//       message.success("Booking saved successfully.");
//       setBookedSeats((prev) => [...prev, ...selectedSeats]);
//       onClose();
//     } catch (error) {
//       message.error("Error saving booking.");
//       console.error("Error saving booking:", error);
//     }
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   if (error) {
//     return <Title level={3}>{error}</Title>;
//   }

//   if (!seatsData || !seatsData.t_rows || !seatsData.t_columns) {
//     return <Title level={3}>No seat layout available.</Title>;
//   }

//   const rows = seatsData.t_rows;
//   const columns = seatsData.t_columns;

//   const allSeats = Array.from({ length: rows }, (_, row) =>
//     Array.from({ length: columns }, (_, col) => `${getRowLabel(row)}${col + 1}`)
//   );

//   return (
//     <Layout className="layout">
//       <Content>
//         <Title level={3}>Seating Layout</Title>

        
//         <div className="date-picker-container">
//           {movieDates.map((date) => (
//             <button
//               key={date}
//               className={`date-button ${selectedDate === date ? "selected" : ""}`}
//               onClick={() => handleDateChange(date)}
//             >
//               {date}
//             </button>
//           ))}
//         </div>

        
//         <div className="seating-layout">
//           {allSeats.map((row, rowIndex) => (
//             <div key={rowIndex} className="seating-row">
//               {/* {row.map((seat) => {
//                 const isBooked = bookedSeats.includes(seat);
//                 const isSelected = selectedSeats.includes(seat);
//                 return (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       isBooked ? "booked" : isSelected ? "selected" : "available"
//                     }`}
//                     onClick={() => handleSeatClick(seat)}
//                     disabled={isBooked}
//                   >
//                     {seat}
//                   </button> */}
//                   {row.map((seat) => {
//   const isBooked = bookedSeats.includes(seat);
//   const isSelected = selectedSeats.includes(seat);
//   const isNonSeating = nonSeatingSpaces.some((space) =>
//     space.cell_indexes.split(",").includes(seat)
//   );

//   return (
//     <button
//       key={seat}
//       className={`seat ${
//         isBooked ? "booked" : isNonSeating ? "non-seating" : isSelected ? "selected" : "available"
//       }`}
//       onClick={() => handleSeatClick(seat)}
//       disabled={isBooked || isNonSeating} 
//     >
//       {seat}
//     </button>
//                 );
//               })}
//             </div>
//           ))}
//         </div>

        
//         <Button type="primary" onClick={handleBookingSave}>
//           Save Booking
//         </Button>
//         <Button type="default" onClick={onClose}>
//           Cancel
//         </Button>
//       </Content>
//     </Layout>
//   );
// };

// export default FetchedSeatLayout;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Layout, Typography, Spin, Button, message } from "antd";
// import "../layout-components/FSeat.css";
// import BookingConfirmation from "../Booking/Booking";
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";

// const { Content } = Layout;
// const { Title } = Typography;


// interface FetchedSeatLayoutProps {
//   theaterId: string;
//   movieId: string;
//   theaterName: string;
//   movieName: string;
//   showTime: string;
//   onClose: () => void;
// }


// const getRowLabel = (index: number): string => String.fromCharCode(65 + index);


// const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
//   const dates: string[] = [];
//   const currentDate = new Date(startDate);
//   currentDate.setDate(currentDate.getDate() + 1);
//   currentDate.setHours(0, 0, 0, 0);
//   const end = new Date(endDate);
//   end.setDate(end.getDate() + 1);
//   end.setHours(0, 0, 0, 0);

//   while (currentDate <= end) {
//     dates.push(currentDate.toISOString().split("T")[0]);
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

// const FetchedSeatLayout: React.FC<FetchedSeatLayoutProps> = ({
//   theaterId,
//   movieId,
//   theaterName,
//   movieName,
//   showTime,
//   onClose,
// }) => {
//   const [seatsData, setSeatsData] = useState<any>(null);
//   const [nonSeatingSpaces, setNonSeatingSpaces] = useState<any[]>([]);
//   const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//   const [bookedSeats, setBookedSeats] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [movieDates, setMovieDates] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [ticket, setTicket] = useState<any | null>(null);
//   const [ticketDialogVisible, setTicketDialogVisible] = useState<boolean>(false); // State for ticket dialog

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const seatsResponse = await axios.get(`http://localhost:9001/theater_seats/${theaterId}`);
//         setSeatsData(seatsResponse.data);

//         const nonSeatingResponse = await axios.get(`http://localhost:9001/non_seating_space/${theaterId}`);
//         setNonSeatingSpaces(nonSeatingResponse.data);

//         const datesResponse = await axios.get(`http://localhost:9001/theaters-movies/${theaterId}/${movieId}`);
//         const { start_date, end_date } = datesResponse.data;
//         if (start_date && end_date) {
//           const allDates = getDatesInRange(new Date(start_date), new Date(end_date));
//           setMovieDates(allDates);
//         }
//       } catch (error: unknown) {
//         setError("Error fetching data.");
//         if (axios.isAxiosError(error)) {
//           console.error("Error fetching data:", error.response?.data || error.message);
//         } else {
//           console.error("Error fetching data:", error);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [theaterId, movieId]);

//   useEffect(() => {
//     const fetchBookedSeats = async () => {
//       if (selectedDate && showTime) {
//         try {
//           const response = await axios.get(`http://localhost:9001/moviebooking/${theaterId}/${movieId}/${showTime}/${selectedDate}`);
//           const bookedSeatsData = response.data.map((booking: any) => JSON.parse(booking.seats));
//           const flattenedBookedSeats = bookedSeatsData.flat();
//           setBookedSeats(flattenedBookedSeats);
//         } catch (error) {
//           console.error("Error fetching booked seats:", error);
//           setBookedSeats([]);
//         }
//       }
//     };
//     fetchBookedSeats();
//   }, [selectedDate, showTime, theaterId, movieId]);

//   const handleDateChange = (date: string) => {
//     setSelectedDate(date);
//     setSelectedSeats([]);
//   };

//   const handleSeatClick = (seat: string) => {
//     if (
//       nonSeatingSpaces.some((space) => space.cell_indexes.split(",").includes(seat)) ||
//       bookedSeats.includes(seat)
//     ) {
//       return;
//     }
//     setSelectedSeats((prev) =>
//       prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
//     );
//   };

//   const handleBookingSave = async () => {
//     if (!selectedDate || !selectedSeats.length || !showTime) {
//       message.error("Please select a date, at least one seat, and a show time.");
//       return;
//     }
  
//     const bookingData = {
//       theater_id: theaterId,
//       theater_name: theaterName,
//       movie_id: movieId,
//       movie_name: movieName,
//       bookingdate: selectedDate,
//       show_time: showTime,
//       seats: JSON.stringify(selectedSeats),
//     };
  
//     try {
//       await axios.post("http://localhost:9001/moviebooking", bookingData);
//       message.success("Booking saved successfully.");
  
//       setBookedSeats((prev) => [...prev, ...selectedSeats]);
  
      
//       const newTicket = {
//         theaterName,
//         movieName,
//         showTime,
//         selectedDate,
//         seats: selectedSeats,
//         poster_url: "URL_TO_MOVIE_POSTER",
//         movieId,
         
//         qrCodeData: JSON.stringify({ 
//           theaterName,
//           movieName,
//           showTime,
//           selectedDate,
//           seats: selectedSeats,
//         }),
//       };
      
      
//       console.log("New ticket:", newTicket);
//       setTicket(newTicket);
//       setTicketDialogVisible(true); 
  
//     } catch (error) {
//       message.error("Error saving booking.");
//       console.error("Error saving booking:", error);
//     }
//   };

//   const handleTicketModalClose = () => {
//     setTicketDialogVisible(false);
//   };

//   if (loading) {
//     return <Spin />;
//   }

//   if (error) {
//     return <Title level={3}>{error}</Title>;
//   }

//   if (!seatsData || !seatsData.t_rows || !seatsData.t_columns) {
//     return <Title level={3}>No seat layout available.</Title>;
//   }

//   const rows = seatsData.t_rows;
//   const columns = seatsData.t_columns;

//   const allSeats = Array.from({ length: rows }, (_, row) =>
//     Array.from({ length: columns }, (_, col) => `${getRowLabel(row)}${col + 1}`)
//   );

//   return (
//     <Layout className="layout">
//       <Content>
//         <Title level={3}>Seating Layout</Title>

//         <div className="date-picker-container">
//           {movieDates.map((date) => (
//             <button
//               key={date}
//               className={`date-button ${selectedDate === date ? "selected" : ""}`}
//               onClick={() => handleDateChange(date)}
//             >
//               {date}
//             </button>
//           ))}
//         </div>

//         <div className="seating-layout">
//           {allSeats.map((row, rowIndex) => (
//             <div key={rowIndex} className="seating-row">
//               {row.map((seat) => {
//                 const isBooked = bookedSeats.includes(seat);
//                 const isSelected = selectedSeats.includes(seat);
//                 const isNonSeating = nonSeatingSpaces.some((space) =>
//                   space.cell_indexes.split(",").includes(seat)
//                 );

//                 return (
//                   <button
//                     key={seat}
//                     className={`seat ${
//                       isBooked
//                         ? "booked"
//                         : isNonSeating
//                         ? "non-seating"
//                         : isSelected
//                         ? "selected"
//                         : "available"
//                     }`}
//                     onClick={() => handleSeatClick(seat)}
//                     disabled={isBooked || isNonSeating}
//                   >
//                     {seat}
//                   </button>
//                 );
//               })}
//             </div>
//           ))}
//         </div>

//         <p>Eyes on this way...</p>

//         <Button type="primary" onClick={handleBookingSave}>
//           Save Booking
//         </Button>
//         <Button type="default" onClick={onClose}>
//           Cancel
//         </Button>

//         {/* Ticket dialog to display booking details */}
//         <BookingConfirmation 
//           ticket={ticket} 
//           onClose={() => setTicket(null)} 
//         />
//       </Content>
//     </Layout>
//   );
// };

// export default FetchedSeatLayout;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Typography, Button, message } from "antd";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"; // Import Stripe components
import BookingConfirmation from "../Booking/Booking";
import "../layout-components/FSeat.css";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const { Content } = Layout;
const { Title } = Typography;

interface SeatData {
  t_rows: number;
  t_columns: number;
}

interface NonSeatingSpace {
  cell_indexes: string;
}

interface BookingData {
  theater_id: string;
  theater_name: string;
  movie_id: string;
  movie_name: string;
  bookingdate: string;
  show_time: string;
  seats: string;
}

interface Ticket {
  theaterName: string;
  movieName: string;
  showTime: string;
  selectedDate: string;
  seats: string[];
  movieId: string;
  qrCodeData: string; 
}

interface FetchedSeatLayoutProps {
  theaterId: string;
  movieId: string;
  theaterName: string;
  movieName: string;
  showTime: string;
  onClose: () => void;
}

const FetchedSeatLayout: React.FC<FetchedSeatLayoutProps> = ({
  theaterId,
  movieId,
  theaterName,
  movieName,
  showTime,
  onClose,
}) => {
  const [seatsData, setSeatsData] = useState<SeatData | null>(null);
  const [nonSeatingSpaces, setNonSeatingSpaces] = useState<NonSeatingSpace[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [movieDates, setMovieDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [ticketDialogVisible, setTicketDialogVisible] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const seatsResponse = await axios.get<SeatData>(`http://localhost:9001/theater_seats/${theaterId}`);
        setSeatsData(seatsResponse.data);

        const nonSeatingResponse = await axios.get<NonSeatingSpace[]>(`http://localhost:9001/non_seating_space/${theaterId}`);
        setNonSeatingSpaces(nonSeatingResponse.data);

        const datesResponse = await axios.get<{ start_date: string; end_date: string }>(
          `http://localhost:9001/theaters-movies/${theaterId}/${movieId}`
        );
        const { start_date, end_date } = datesResponse.data;
        const allDates = getDatesInRange(new Date(start_date), new Date(end_date));
        setMovieDates(allDates);
      } catch (error) {
        setError("Error fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [theaterId, movieId]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (selectedDate && showTime) {
        try {
          const response = await axios.get<{ seats: string }[]>(
            `http://localhost:9001/moviebooking/${theaterId}/${movieId}/${showTime}/${selectedDate}`
          );
          const bookedSeatsData = response.data.map((booking) => JSON.parse(booking.seats));
          const flattenedBookedSeats = bookedSeatsData.flat();
          setBookedSeats(flattenedBookedSeats);
        } catch (error) {
          console.error("Error fetching booked seats:", error);
          setBookedSeats([]);
        }
      }
    };
    fetchBookedSeats();
  }, [selectedDate, showTime, theaterId, movieId]);

  const handleSeatClick = (seat: string) => {
    if (
      nonSeatingSpaces.some((space) => space.cell_indexes.split(",").includes(seat)) ||
      bookedSeats.includes(seat)
    ) {
      return;
    }
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedSeats([]);
  };

  // import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

  // Assuming you already have the following function on your backend:
  // POST /create-payment-intent (which returns a clientSecret for payment confirmation)
  
  const handleBookingSave = async () => {
    if (!selectedDate || !selectedSeats.length || !showTime) {
      message.error("Please select a date, seats, and a show time.");
      return;
    }
  
    const bookingData: BookingData = {
      theater_id: theaterId,
      theater_name: theaterName,
      movie_id: movieId,
      movie_name: movieName,
      bookingdate: selectedDate,
      show_time: showTime,
      seats: JSON.stringify(selectedSeats),
    };
  
    setIsProcessing(true);
  
    try {
      // Step 1: Create PaymentIntent on your backend
      const paymentIntentResponse = await axios.post(
        "http://localhost:9001/create-payment-intent",
        {
          amount: calculateTotalPrice(selectedSeats), // Customize pricing logic
          currency: "usd",
        }
      );
      const { clientSecret } = paymentIntentResponse.data;
  
      // Step 2: Confirm payment using clientSecret and CardElement
      const cardElement = elements?.getElement(CardElement);
      if (!cardElement) throw new Error("Card Element not found");
  
      const paymentResult = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Customer Name", // Customize with actual customer info
          },
        },
      });
  
      if (paymentResult?.error) {
        message.error("Payment failed.");
        console.error("Error during payment:", paymentResult.error);
        setIsProcessing(false);
        return;
      }
  
      if (paymentResult?.paymentIntent?.status === "succeeded") {
        // Step 3: Save booking data after payment succeeds
        await axios.post("http://localhost:9001/moviebooking", bookingData);
        message.success("Booking and payment successful!");
  
        const newTicket: Ticket = {
          theaterName,
          movieName,
          showTime,
          selectedDate,
          seats: selectedSeats,
          movieId,
          qrCodeData: "SampleQRCodeData",
        };
        setTicket(newTicket);
        setTicketDialogVisible(true);
      }
    } catch (error) {
      message.error("Booking or payment error.");
      console.error("Error saving booking:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  

  const handleTicketModalClose = () => {
    setTicketDialogVisible(false);
  };

  const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
    const dates: string[] = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const calculateTotalPrice = (seats: string[]): number => {
    const pricePerSeat = 10; // Example pricing logic
    return seats.length * pricePerSeat;
  };

  return (
    <Layout className="layout">
      <Content>
        <Title level={3}>Seating Layout</Title>

        <div className="date-picker-container">
          {movieDates.map((date) => (
            <button
              key={date}
              className={`date-button ${selectedDate === date ? "selected" : ""}`}
              onClick={() => handleDateChange(date)}
            >
              {date}
            </button>
          ))}
        </div>

        <div className="seating-layout">
          {Array.from({ length: seatsData?.t_rows || 0 }, (_, row) => (
            <div key={row} className="seating-row">
              {Array.from({ length: seatsData?.t_columns || 0 }, (_, col) => {
                const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                const isNonSeating = nonSeatingSpaces.some((space) =>
                  space.cell_indexes.split(",").includes(seat)
                );

                return (
                  <button
                    key={seat}
                    className={`seat ${
                      isBooked
                        ? "booked"
                        : isNonSeating
                        ? "non-seating"
                        : isSelected
                        ? "selected"
                        : "available"
                    }`}
                    onClick={() => handleSeatClick(seat)}
                    disabled={isBooked || isNonSeating}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <Button type="primary" onClick={handleBookingSave} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </Button>
        <Button type="default" onClick={onClose}>
          Cancel
        </Button>

        {ticket && <BookingConfirmation ticket={ticket} onClose={handleTicketModalClose} />}

        <Dialog open={ticketDialogVisible} onClose={handleTicketModalClose}>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogContent>
            <Box>
              <CardElement />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTicketModalClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Content>
    </Layout>
  );
};

export default FetchedSeatLayout;
