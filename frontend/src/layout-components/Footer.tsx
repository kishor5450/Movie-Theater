// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MovieScheduleDialog from "../Merge/MovieSchedule";
// import SeatLayoutModal from "../layout-components/Model";


// interface Theater {
//   id: number;
//   name: string;
//   area: string;
//   city: string;
//   rows?: number;
//   columns?: number;
//   nonSeatingSpaces: number;
//   total_seats?: number;
//   scheduledMovie?: string;
// }

// interface Movie {
//   name: string;
// }

// const Footer: React.FC = () => {
//   const [theatersList, setTheatersList] = useState<Theater[]>([]);
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//   const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
//   const [scheduledMovie, setScheduledMovie] = useState<string | null>(null);
//   const [isSeatLayoutVisible, setIsSeatLayoutVisible] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchTheaterData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9001/theaters");
//         const fetchedData: Theater[] = response.data;

//         const updatedTheatersList = fetchedData.map((theater) => {
//           const totalSeats =
//             theater.rows && theater.columns
//               ? theater.rows * theater.columns - theater.nonSeatingSpaces
//               : 0;
//           return {
//             ...theater,
//             totalSeats,
//           };
//         });

//         setTheatersList(updatedTheatersList);
//       } catch (error) {
//         console.error("Error fetching theater data:", error);
//       }
//     };

//     fetchTheaterData();
//   }, []);

//   const deleteTheater = async (theaterId: number) => {
//     try {
//       await axios.delete(`http://localhost:9001/theaters/${theaterId}`);
//       setTheatersList((prevTheaters) =>
//         prevTheaters.filter((theater) => theater.id !== theaterId)
//       );
//     } catch (error) {
//       console.error("Error deleting theater:", error);
//     }
//   };

//   const handleScheduleMovie = (theaterId: number) => {
//     setSelectedTheaterId(theaterId);
//     setIsModalVisible(true);
//   };

//   const handleMovieScheduled = (movie: Movie) => {
//     setTheatersList((prevTheaters) =>
//       prevTheaters.map((theater) =>
//         theater.id === selectedTheaterId
//           ? { ...theater, scheduledMovie: movie.name }
//           : theater
//       )
//     );
//     setScheduledMovie(movie.name);
//     setIsModalVisible(false);
//   };

//   const handleViewSeats = (theaterId: number) => {
//     setSelectedTheaterId(theaterId);
//     setIsSeatLayoutVisible(true);
//   };

//   return (
//     <div>
//       <table style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Area</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>City</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//               Total Seats
//             </th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>Movies</th>
//             <th style={{ border: "1px solid #ddd", padding: "8px" }}>
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {theatersList.map((theater) => (
//             <tr key={theater.id}>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {theater.name}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {theater.area}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {theater.city}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {theater.total_seats}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {theater.scheduledMovie}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 <button
//                   onClick={() => deleteTheater(theater.id)}
//                   style={{
//                     color: "white",
//                     backgroundColor: "red",
//                     border: "none",
//                     padding: "5px 10px",
//                     cursor: "pointer",
//                     marginRight: "10px",
//                   }}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleScheduleMovie(theater.id)}
//                   style={{
//                     color: "white",
//                     backgroundColor: "blue",
//                     border: "none",
//                     padding: "5px 10px",
//                     cursor: "pointer",
//                     marginRight: "10px",
//                   }}
//                 >
//                   Schedule Movie
//                 </button>
//                 <button
//                   onClick={() => handleViewSeats(theater.id)}
//                   style={{
//                     color: "white",
//                     backgroundColor: "green",
//                     border: "none",
//                     padding: "5px 10px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   View Seats
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalVisible && (
//         <MovieScheduleDialog
//           visible={isModalVisible}
//           onClose={() => setIsModalVisible(false)}
//           onMovieScheduled={handleMovieScheduled}
//           theaterId={selectedTheaterId}
//         />
//       )}
//       {isSeatLayoutVisible && selectedTheaterId !== null && (
//         <SeatLayoutModal
//           visible={isSeatLayoutVisible}
//           onClose={() => setIsSeatLayoutVisible(false)}
//           theaterId={selectedTheaterId.toString()}  
//         />
//       )}
//     </div>
//   );
// };

// export default Footer;
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieScheduleDialog from "../Merge/MovieSchedule";
import SeatLayoutModal from "../layout-components/Model";
import { useNavigate } from "react-router-dom";

interface Theater {
  id: number;
  name: string;
  area: string;
  city: string;
  rows?: number;
  columns?: number;
  nonSeatingSpaces: number;
  total_seats?: number;
  scheduledMovie?: string;
}

interface Movie {
  name: string;
}

const Footer: React.FC = () => {
  const [theatersList, setTheatersList] = useState<Theater[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
  const [scheduledMovie, setScheduledMovie] = useState<string | null>(null);
  const [isSeatLayoutVisible, setIsSeatLayoutVisible] = useState<boolean>(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null); 
  const [theaterName, setTheaterName] = useState<string>(""); 
  const [movieName, setMovieName] = useState<string>(""); 
  const navigate=useNavigate();


  useEffect(() => {
    const fetchTheaterData = async () => {
      try {
        const response = await axios.get("http://localhost:9001/theaters");
        const fetchedData: Theater[] = response.data;

        const updatedTheatersList = fetchedData.map((theater) => {
          const totalSeats =
            theater.rows && theater.columns
              ? theater.rows * theater.columns - theater.nonSeatingSpaces
              : 0;
          return {
            ...theater,
            totalSeats,
          };
        });

        setTheatersList(updatedTheatersList);
      } catch (error) {
        console.error("Error fetching theater data:", error);
      }
    };

    fetchTheaterData();
  }, []);

  const deleteTheater = async (theaterId: number) => {
    try {
      await axios.delete(`http://localhost:9001/theaters/${theaterId}`);
      setTheatersList((prevTheaters) =>
        prevTheaters.filter((theater) => theater.id !== theaterId)
      );
      navigate('/')
    } catch (error) {
      console.error("Error deleting theater:", error);
    }
  };

  const handleScheduleMovie = (theaterId: number) => {
    setSelectedTheaterId(theaterId);
    setIsModalVisible(true);
  };

  const handleMovieScheduled = (movie: Movie) => {
    setTheatersList((prevTheaters) =>
      prevTheaters.map((theater) =>
        theater.id === selectedTheaterId
          ? { ...theater, scheduledMovie: movie.name }
          : theater
      )
    );
    setScheduledMovie(movie.name);
    setIsModalVisible(false);
  };

  const handleViewSeats = (theaterId: number) => {
    setSelectedTheaterId(theaterId);
    const selectedTheater = theatersList.find((theater) => theater.id === theaterId);
    if (selectedTheater) {
      setTheaterName(selectedTheater.name); 
      setMovieName(selectedTheater.scheduledMovie || ""); 
     
    }
    setIsSeatLayoutVisible(true);
  };

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Area</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>City</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Total Seats
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Movies</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {theatersList.map((theater) => (
            <tr key={theater.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {theater.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {theater.area}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {theater.city}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {theater.total_seats}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {theater.scheduledMovie}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <button
                  onClick={() => deleteTheater(theater.id)}
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => handleScheduleMovie(theater.id)}
                  style={{
                    color: "white",
                    backgroundColor: "blue",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Schedule Movie
                </button>
                <button
                  onClick={() => handleViewSeats(theater.id)}
                  style={{
                    color: "white",
                    backgroundColor: "green",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  View Seats
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalVisible && (
        <MovieScheduleDialog
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onMovieScheduled={handleMovieScheduled}
          theaterId={selectedTheaterId}
        />
      )}
      {isSeatLayoutVisible && selectedTheaterId !== null && (
        <SeatLayoutModal
          visible={isSeatLayoutVisible}
          onClose={() => setIsSeatLayoutVisible(false)}
          theaterId={selectedTheaterId}  
          movieId={selectedMovieId || 0} 
          theaterName={theaterName} 
          movieName={movieName} 
          showTime={selectedMovieId ? "Your Show Time Here" : ""}
        />
      )}
    </div>
  );
};

export default Footer;


