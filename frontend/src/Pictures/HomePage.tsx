// import React, { useEffect, useState } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import Cards from "../cards/cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Carousel } from "antd";


// interface Movie {
//   id: number;
//   name: string;
//   release_date: string;
//   poster_url: string;
// }

// interface TheaterMovie {
//   movie_id: number;
//   theater_name: string;
// }

// const HomePage: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get("http://localhost:9001/movies");
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     const fetchTheaterMovies = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:9001/theaters-movies"
//         );
//         setTheaterMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching theater movies:", error);
//       }
//     };

//     fetchMovies();
//     fetchTheaterMovies();
//   }, []);

//   return (
//     <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
      // <Box margin={"auto"} height={"40%"} width={"80%"} marginTop={1}>
      //   <Carousel autoplay>
      //     <div>
      //       <img
      //         src="https://i.pinimg.com/736x/7b/04/16/7b0416a509fd2b88ca49765af4089002.jpg"
      //         alt="Image 1"
      //         style={{ width: "100%", height: "300px", objectFit: "cover" }}
      //       />
      //     </div>
      //     <div>
      //       <img
      //         src="https://wallpaperaccess.com/full/7978053.jpg"
      //         alt="Image 2"
      //         style={{ width: "100%", height: "300px", objectFit: "cover" }}
      //       />
      //     </div>
      //     <div>
      //       <img
      //         src="https://images.spiderum.com/sp-images/8d5590c080e311ed8a6481196edc880f.jpeg"
      //         alt="Image 3"
      //         style={{ width: "100%", height: "300px", objectFit: "cover" }}
      //       />
      //     </div>
      //   </Carousel>
      // </Box>
//       <Box padding={2} margin={"auto"}>
//         <Typography variant="h5" textAlign={"center"}>
//           Latest Releases
//         </Typography>
//       </Box>
//       <Box
//         display={"flex"}
//         width={"95%"}
//         justifyContent={"center"}
//         flexWrap={"wrap"}
//       >
//         {movies &&
//           movies.map((movie, index) => {
//             const theatersForMovie = theaterMovies
//               .filter((tm) => tm.movie_id === movie.id)
//               .map((tm) => tm.theater_name)
//               .join(", ");

//             return (
//               <Cards
//                 name={movie.name}
//                 release_date={movie.release_date}
//                 poster_url={movie.poster_url}
//                 theaterName={theatersForMovie || "Not Scheduled"}
//                 key={index}
//               />
//             );
//           })}
//       </Box>
//       <Box display={"flex"} padding={"5"} margin={"auto"}>
//         <Button
//           component={Link}
//           to="/movies"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//           size="small"
//           variant="outlined"
//         >
//           View All Movies
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Cards from "../cards/cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Carousel } from "antd";
// import FetchedSeatLayout from "../layout-components/FetchedSeatLayout"; // Adjust the path as necessary

// interface Movie {
//   id: number;
//   name: string;
//   release_date: string;
//   poster_url: string;
// }

// interface TheaterMovie {
//   movie_id: number;
//   theater_id: number;
//   theater_name: string;
// }


// interface FetchedSeatLayoutProps {
//   theaterId: number;
//   movieId: number;
//   theaterName: string;
//   movieName: string;
//   onClose: () => void;
// }

// const HomePage: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [seatLayoutDialogOpen, setSeatLayoutDialogOpen] = useState<boolean>(false);
//   const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
//   const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
//   const [theatersForSelectedMovie, setTheatersForSelectedMovie] = useState<TheaterMovie[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTheaterName, setSelectedTheaterName] = useState<string | null>(null);
//   const [selectedMovieName, setSelectedMovieName] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get<Movie[]>("http://localhost:9001/movies");
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     const fetchTheaterMovies = async () => {
//       try {
//         const response = await axios.get<TheaterMovie[]>( "http://localhost:9001/theaters-movies" );
//         setTheaterMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching theater movies:", error);
//       }
//     };

//     fetchMovies();
//     fetchTheaterMovies();
//   }, []);

//   const handleBookClick = (movieId: number) => {
//     const theaters = theaterMovies.filter((tm) => tm.movie_id === movieId);
//     setTheatersForSelectedMovie(theaters);
//     setSelectedMovieId(movieId);
//     const selectedMovie = movies.find((movie) => movie.id === movieId);
//     if (selectedMovie) {
//       setSelectedMovieName(selectedMovie.name);
//     }
//     setDialogOpen(true);
//   };

//   const handleTheaterSelect = (theaterId: number, theaterName: string) => {
//     setSelectedTheaterId(theaterId);
//     setSelectedTheaterName(theaterName);
//     setSeatLayoutDialogOpen(true);
//     setDialogOpen(false);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedTheaterId(null);
//     setTheatersForSelectedMovie([]);
//   };

//   const handleCloseSeatLayoutDialog = () => {
//     setSeatLayoutDialogOpen(false);
//     setSelectedTheaterId(null);
//     setSelectedMovieId(null);
//     setSelectedDate(null);
//     setSelectedTheaterName(null);
//     setSelectedMovieName(null);
//   };

//   return (
//     <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
//       <Box margin={"auto"} height={"40%"} width={"80%"} marginTop={1}>
//         <Carousel autoplay>{/* Carousel images */}</Carousel>
//       </Box>

//       <Box padding={2} margin={"auto"}>
//         <Typography variant="h5" textAlign={"center"}>
//           Latest Releases
//         </Typography>
//       </Box>
//       <Box
//         display={"flex"}
//         width={"95%"}
//         justifyContent={"center"}
//         flexWrap={"wrap"}
//       >
//         {movies.map((movie) => (
//           <Cards
//             key={movie.id}
//             name={movie.name}
//             release_date={movie.release_date}
//             poster_url={movie.poster_url}
//             theaterName={
//               theaterMovies.filter((tm) => tm.movie_id === movie.id).length > 0
//                 ? "IN CINEMAS NOW"
//                 : "coming soon"
//             }
//             onBookClick={() => handleBookClick(movie.id)}
//           />
//         ))}
//       </Box>
//       <Box display={"flex"} padding={"5"} margin={"auto"}>
//         <Button
//           component={Link}
//           to="/movies"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//           size="small"
//           variant="outlined"
//         >
//           View All Movies
//         </Button>
//       </Box>

//       {/* Dialog for Theater Selection */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Select a Theater</DialogTitle>
//         <DialogContent>
//           {theatersForSelectedMovie.length > 0 ? (
//             theatersForSelectedMovie.map((theater) => (
//               <Button
//                 key={theater.theater_id}
//                 variant="contained"
//                 onClick={() =>
//                   handleTheaterSelect(theater.theater_id, theater.theater_name)
//                 }
//                 sx={{ margin: 1 }}
//               >
//                 {theater.theater_name}
//               </Button>
//             ))
//           ) : (
//             <Typography>No theaters available for this movie.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog for Seat Layout */}
//       <Dialog open={seatLayoutDialogOpen} onClose={handleCloseSeatLayoutDialog}>
//         <DialogTitle>Select seats</DialogTitle>
//         <DialogContent>
//           {selectedTheaterId && selectedMovieId && selectedTheaterName && selectedMovieName && (
//             <FetchedSeatLayout
//               theaterId={selectedTheaterId} 
//               movieId={selectedMovieId} 
//               theaterName={selectedTheaterName} 
//               movieName={selectedMovieName} 
//               onClose={handleCloseSeatLayoutDialog}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSeatLayoutDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Cards from "../cards/cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Carousel } from "antd";
// import FetchedSeatLayout from "../layout-components/FetchedSeatLayout"; 

// interface Movie {
//   id: number;
//   name: string;
//   release_date: string;
//   poster_url: string;
// }

// interface TheaterMovie {
//   movie_id: number;
//   theater_id: number;
//   theater_name: string;
// }

// interface FetchedSeatLayoutProps {
//   theaterId: string; 
//   movieId: string; 
//   theaterName: string;
//   movieName: string;
//   onClose: () => void;
// }


// const HomePage: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [seatLayoutDialogOpen, setSeatLayoutDialogOpen] = useState<boolean>(false);
//   const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
//   const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
//   const [theatersForSelectedMovie, setTheatersForSelectedMovie] = useState<TheaterMovie[]>([]);
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTheaterName, setSelectedTheaterName] = useState<string | null>(null);
//   const [selectedMovieName, setSelectedMovieName] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get<Movie[]>("http://localhost:9001/movies");
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     const fetchTheaterMovies = async () => {
//       try {
//         const response = await axios.get<TheaterMovie[]>("http://localhost:9001/theaters-movies");
//         setTheaterMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching theater movies:", error);
//       }
//     };

//     fetchMovies();
//     fetchTheaterMovies();
//   }, []);

//   const handleBookClick = (movieId: number) => {
//     const theaters = theaterMovies.filter((tm) => tm.movie_id === movieId);
//     setTheatersForSelectedMovie(theaters);
//     setSelectedMovieId(movieId);
//     const selectedMovie = movies.find((movie) => movie.id === movieId);
//     if (selectedMovie) {
//       setSelectedMovieName(selectedMovie.name);
//     }
//     setDialogOpen(true);
//   };

//   const handleTheaterSelect = (theaterId: number, theaterName: string) => {
//     setSelectedTheaterId(theaterId);
//     setSelectedTheaterName(theaterName);
//     setSeatLayoutDialogOpen(true);
//     setDialogOpen(false);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedTheaterId(null);
//     setTheatersForSelectedMovie([]);
//   };

//   const handleCloseSeatLayoutDialog = () => {
//     setSeatLayoutDialogOpen(false);
//     setSelectedTheaterId(null);
//     setSelectedMovieId(null);
//     setSelectedDate(null);
//     setSelectedTheaterName(null);
//     setSelectedMovieName(null);
//   };

//   return (
//     <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
//       <Box margin={"auto"} height={"40%"} width={"80%"} marginTop={1}>
        // <Carousel autoplay speed={1000}>
        //   <div>
        //     <img
        //       src="https://i.pinimg.com/736x/7b/04/16/7b0416a509fd2b88ca49765af4089002.jpg"
        //       alt="Image 1"
        //       style={{ width: "100%", height: "300px", objectFit: "cover" }}
        //     />
        //   </div>
        //   <div>
        //     <img
        //       src="https://wallpaperaccess.com/full/7978053.jpg"
        //       alt="Image 2"
        //       style={{ width: "100%", height: "300px", objectFit: "cover" }}
        //     />
        //   </div>
        //   <div>
        //     <img
        //       src="https://images.spiderum.com/sp-images/8d5590c080e311ed8a6481196edc880f.jpeg"
        //       alt="Image 3"
        //       style={{ width: "100%", height: "300px", objectFit: "cover" }}
        //     />
        //   </div>
        // </Carousel>
//       </Box>

//       <Box padding={2} margin={"auto"}>
//         <Typography variant="h5" textAlign={"center"}>
//           Latest Releases
//         </Typography>
//       </Box>

//       <Box
//         display={"flex"}
//         width={"95%"}
//         justifyContent={"center"}
//         flexWrap={"wrap"}
//       >
//         {movies.map((movie) => (
//           <Cards
//             key={movie.id}
//             name={movie.name}
//             release_date={movie.release_date}
//             poster_url={movie.poster_url}
//             theaterName={
//               theaterMovies.filter((tm) => tm.movie_id === movie.id).length > 0
//                 ? "IN CINEMAS NOW"
//                 : "coming soon"
//             }
//             onBookClick={() => handleBookClick(movie.id)}
//           />
//         ))}
//       </Box>

//       <Box display={"flex"} padding={"5"} margin={"auto"}>
//         <Button
//           component={Link}
//           to="/movies"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//           size="small"
//           variant="outlined"
//         >
//           View All Movies
//         </Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Select a Theater</DialogTitle>
//         <DialogContent>
//           {theatersForSelectedMovie.length > 0 ? (
//             theatersForSelectedMovie.map((theater) => (
//               <Button
//                 key={theater.theater_id}
//                 variant="contained"
//                 onClick={() =>
//                   handleTheaterSelect(theater.theater_id, theater.theater_name)
//                 }
//                 sx={{ margin: 1 }}
//               >
//                 {theater.theater_name}
//               </Button>
//             ))
//           ) : (
//             <Typography>No theaters available for this movie.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={seatLayoutDialogOpen} onClose={handleCloseSeatLayoutDialog}>
//         <DialogTitle>Select seats</DialogTitle>
//         <DialogContent>
//           {selectedTheaterId && selectedMovieId && selectedTheaterName && selectedMovieName && (
//             <FetchedSeatLayout
//               theaterId={selectedTheaterId?.toString()!}
//               movieId={selectedMovieId?.toString()!} 
//               theaterName={selectedTheaterName!}
//               movieName={selectedMovieName!}
//               onClose={handleCloseSeatLayoutDialog}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSeatLayoutDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Cards from "../cards/cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Carousel } from "antd";
// import FetchedSeatLayout from "../layout-components/FetchedSeatLayout"; 
// import ShowsButtons from "../Shows/ShowsButtons"; // Import the ShowsButtons component

// interface Movie {
//   id: number;
//   name: string;
//   release_date: string;
//   poster_url: string;
// }

// interface TheaterMovie {
//   movie_id: number;
//   theater_id: number;
//   theater_name: string;
// }

// interface ShowData {
//   show_no: string;
//   start_time: string;
// }

// const HomePage: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [seatLayoutDialogOpen, setSeatLayoutDialogOpen] = useState<boolean>(false);
//   const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
//   const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
//   const [theatersForSelectedMovie, setTheatersForSelectedMovie] = useState<TheaterMovie[]>([]);
//   const [shows, setShows] = useState<ShowData[]>([]);  // Add state for shows
//   const [selectedShow, setSelectedShow] = useState<ShowData | null>(null); // Track selected show
//   const [selectedTheaterName, setSelectedTheaterName] = useState<string | null>(null);
//   const [selectedMovieName, setSelectedMovieName] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get<Movie[]>("http://localhost:9001/movies");
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     const fetchTheaterMovies = async () => {
//       try {
//         const response = await axios.get<TheaterMovie[]>("http://localhost:9001/theaters-movies");
//         setTheaterMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching theater movies:", error);
//       }
//     };

//     fetchMovies();
//     fetchTheaterMovies();
//   }, []);

//   const handleBookClick = (movieId: number) => {
//     const theaters = theaterMovies.filter((tm) => tm.movie_id === movieId);
//     setTheatersForSelectedMovie(theaters);
//     setSelectedMovieId(movieId);
//     const selectedMovie = movies.find((movie) => movie.id === movieId);
//     if (selectedMovie) {
//       setSelectedMovieName(selectedMovie.name);
//     }
//     setDialogOpen(true);
//   };

//   const handleTheaterSelect = async (theaterId: number, theaterName: string) => {
//     setSelectedTheaterId(theaterId);
//     setSelectedTheaterName(theaterName);
    
//     // Fetch shows for the selected theater and movie
//     try {
//       const response = await axios.get<ShowData[]>(
//         `http://localhost:9001/shows/${theaterId}`
//       );
//       setShows(response.data);
//     } catch (error) {
//       console.error("Error fetching shows:", error);
//     }
    
//     setDialogOpen(false); // Close the theater dialog and show available shows
//   };

//   const handleShowSelect = (show: ShowData) => {
//     setSelectedShow(show);
//     setSeatLayoutDialogOpen(true); // Open seat layout for the selected show
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedTheaterId(null);
//     setTheatersForSelectedMovie([]);
//   };

//   const handleCloseSeatLayoutDialog = () => {
//     setSeatLayoutDialogOpen(false);
//     setSelectedShow(null);
//     setSelectedTheaterId(null);
//     setSelectedMovieId(null);
//     setSelectedTheaterName(null);
//     setSelectedMovieName(null);
//   };

//   return (
//     <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
//       <Box margin={"auto"} height={"40%"} width={"80%"} marginTop={1}>
//         <Carousel autoplay speed={1000}>
//           {/* Carousel contents */}
//         </Carousel>
//       </Box>

//       <Box padding={2} margin={"auto"}>
//         <Typography variant="h5" textAlign={"center"}>
//           Latest Releases
//         </Typography>
//       </Box>

//       <Box
//         display={"flex"}
//         width={"95%"}
//         justifyContent={"center"}
//         flexWrap={"wrap"}
//       >
//         {movies.map((movie) => (
//           <Cards
//             key={movie.id}
//             name={movie.name}
//             release_date={movie.release_date}
//             poster_url={movie.poster_url}
//             theaterName={
//               theaterMovies.filter((tm) => tm.movie_id === movie.id).length > 0
//                 ? "IN CINEMAS NOW"
//                 : "coming soon"
//             }
//             onBookClick={() => handleBookClick(movie.id)}
//           />
//         ))}
//       </Box>

//       <Box display={"flex"} padding={"5"} margin={"auto"}>
//         <Button
//           component={Link}
//           to="/movies"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//           size="small"
//           variant="outlined"
//         >
//           View All Movies
//         </Button>
//       </Box>

//       {/* Theater Selection Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Select a Theater</DialogTitle>
//         <DialogContent>
//           {theatersForSelectedMovie.length > 0 ? (
//             theatersForSelectedMovie.map((theater) => (
//               <Button
//                 key={theater.theater_id}
//                 variant="contained"
//                 onClick={() =>
//                   handleTheaterSelect(theater.theater_id, theater.theater_name)
//                 }
//                 sx={{ margin: 1 }}
//               >
//                 {theater.theater_name}
//               </Button>
//             ))
//           ) : (
//             <Typography>No theaters available for this movie.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Show Selection Dialog */}
//       <Dialog open={selectedTheaterId !== null && shows.length > 0}>
//         <DialogTitle>Select a Show</DialogTitle>
//         <DialogContent>
//           {shows.length > 0 ? (
//             <ShowsButtons shows={shows} onShowSelect={handleShowSelect} />
//           ) : (
//             <Typography>No shows available for this theater.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSelectedTheaterId(null)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Seat Layout Dialog */}
//       <Dialog open={seatLayoutDialogOpen} onClose={handleCloseSeatLayoutDialog}>
//         <DialogTitle>Select seats</DialogTitle>
//         <DialogContent>
//           {selectedTheaterId && selectedMovieId && selectedShow && selectedTheaterName && selectedMovieName && (
//             <FetchedSeatLayout
//               theaterId={selectedTheaterId?.toString()!}
//               movieId={selectedMovieId?.toString()!}
//               theaterName={selectedTheaterName!}
//               movieName={selectedMovieName!}
//               onClose={handleCloseSeatLayoutDialog}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSeatLayoutDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default HomePage;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import Cards from "../cards/cards";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Carousel } from "antd";
// import FetchedSeatLayout from "../layout-components/FetchedSeatLayout"; 
// import ShowsButtons from "../Shows/ShowsButtons"; // Import the ShowsButtons component

// interface Movie {
//   id: number;
//   name: string;
//   release_date: string;
//   poster_url: string;
// }

// interface TheaterMovie {
//   movie_id: number;
//   theater_id: number;
//   theater_name: string;
// }

// interface ShowData {
//   show_no: string;
//   start_time: string;
// }

// const HomePage: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);
//   const [dialogOpen, setDialogOpen] = useState<boolean>(false);
//   const [seatLayoutDialogOpen, setSeatLayoutDialogOpen] = useState<boolean>(false);
//   const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
//   const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
//   const [theatersForSelectedMovie, setTheatersForSelectedMovie] = useState<TheaterMovie[]>([]);
//   const [shows, setShows] = useState<ShowData[]>([]);
//   const [selectedShow, setSelectedShow] = useState<ShowData | null>(null);
//   const [selectedTheaterName, setSelectedTheaterName] = useState<string | null>(null);
//   const [selectedMovieName, setSelectedMovieName] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get<Movie[]>("http://localhost:9001/movies");
//         setMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     const fetchTheaterMovies = async () => {
//       try {
//         const response = await axios.get<TheaterMovie[]>("http://localhost:9001/theaters-movies");
//         setTheaterMovies(response.data);
//       } catch (error) {
//         console.error("Error fetching theater movies:", error);
//       }
//     };

//     fetchMovies();
//     fetchTheaterMovies();
//   }, []);

//   const handleBookClick = (movieId: number) => {
//     const theaters = theaterMovies.filter((tm) => tm.movie_id === movieId);
//     setTheatersForSelectedMovie(theaters);
//     setSelectedMovieId(movieId);
//     const selectedMovie = movies.find((movie) => movie.id === movieId);
//     if (selectedMovie) {
//       setSelectedMovieName(selectedMovie.name);
//     }
//     setDialogOpen(true);
//   };

//   const handleTheaterSelect = async (theaterId: number, theaterName: string) => {
//     setSelectedTheaterId(theaterId);
//     setSelectedTheaterName(theaterName);
    
//     // Fetch shows for the selected theater and movie
//     try {
//       const response = await axios.get<ShowData[]>(`http://localhost:9001/shows/${theaterId}`);
//       setShows(response.data);
//     } catch (error) {
//       console.error("Error fetching shows:", error);
//     }
    
//     setDialogOpen(false); // Close the theater dialog and show available shows
//   };

//   const handleShowSelect = (show: ShowData) => {
//     setSelectedShow(show);
//     setSeatLayoutDialogOpen(true); // Open seat layout for the selected show
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedTheaterId(null);
//     setTheatersForSelectedMovie([]);
//   };

//   const handleCloseSeatLayoutDialog = () => {
//     setSeatLayoutDialogOpen(false);
//     setSelectedShow(null);
//     setSelectedTheaterId(null);
//     setSelectedMovieId(null);
//     setSelectedTheaterName(null);
//     setSelectedMovieName(null);
//   };

//   return (
//     <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
//       <Box margin={"auto"} height={"40%"} width={"80%"} marginTop={1}>
//         <Carousel autoplay speed={1000}>
//           {/* Carousel contents */}
//         </Carousel>
//       </Box>

//       <Box padding={2} margin={"auto"}>
//         <Typography variant="h5" textAlign={"center"}>
//           Latest Releases
//         </Typography>
//       </Box>

//       <Box display={"flex"} width={"95%"} justifyContent={"center"} flexWrap={"wrap"}>
//         {movies.map((movie) => (
//           <Cards
//             key={movie.id}
//             name={movie.name}
//             release_date={movie.release_date}
//             poster_url={movie.poster_url}
//             theaterName={
//               theaterMovies.filter((tm) => tm.movie_id === movie.id).length > 0
//                 ? "IN CINEMAS NOW"
//                 : "coming soon"
//             }
//             onBookClick={() => handleBookClick(movie.id)}
//           />
//         ))}
//       </Box>

//       <Box display={"flex"} padding={"5"} margin={"auto"}>
//         <Button
//           component={Link}
//           to="/movies"
//           sx={{ margin: "auto", color: "#2b2d42" }}
//           size="small"
//           variant="outlined"
//         >
//           View All Movies
//         </Button>
//       </Box>

//       {/* Theater Selection Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>Select a Theater</DialogTitle>
//         <DialogContent>
//           {theatersForSelectedMovie.length > 0 ? (
//             theatersForSelectedMovie.map((theater) => (
//               <Button
//                 key={theater.theater_id}
//                 variant="contained"
//                 onClick={() =>
//                   handleTheaterSelect(theater.theater_id, theater.theater_name)
//                 }
//                 sx={{ margin: 1 }}
//               >
//                 {theater.theater_name}
//               </Button>
//             ))
//           ) : (
//             <Typography>No theaters available for this movie.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Show Selection Dialog */}
//       <Dialog open={selectedTheaterId !== null && shows.length > 0}>
//         <DialogTitle>Select a Show</DialogTitle>
//         <DialogContent>
//           {shows.length > 0 ? (
//             <ShowsButtons shows={shows} onShowSelect={handleShowSelect} />
//           ) : (
//             <Typography>No shows available for this theater.</Typography>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSelectedTheaterId(null)}>Close</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Seat Layout Dialog */}
//       <Dialog open={seatLayoutDialogOpen} onClose={handleCloseSeatLayoutDialog}>
//         <DialogTitle>Select seats</DialogTitle>
//         <DialogContent>
//           {selectedTheaterId && selectedMovieId && selectedShow && selectedTheaterName && selectedMovieName && (
//             <FetchedSeatLayout
//               theaterId={selectedTheaterId?.toString()!}
//               movieId={selectedMovieId?.toString()!}
//               theaterName={selectedTheaterName!}
//               movieName={selectedMovieName!}
//               onClose={handleCloseSeatLayoutDialog}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseSeatLayoutDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Cards from "../cards/cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import FetchedSeatLayout from "../layout-components/FetchedSeatLayout"; 
import ShowsButtons from "../Shows/ShowsButtons"; 
import VideoCarousel from "../TRAILERS/VideoCarousel";



// import MoviePage from "../TRAILERS/Trailers";

interface Movie {
  id: number;
  name: string;
  release_date: string;
  poster_url: string;
}

interface TheaterMovie {
  movie_id: number;
  theater_id: number;
  theater_name: string;
}

interface ShowData {
  show_no: string;
  start_time: string;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaterMovies, setTheaterMovies] = useState<TheaterMovie[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [seatLayoutDialogOpen, setSeatLayoutDialogOpen] = useState<boolean>(false);
  const [selectedTheaterId, setSelectedTheaterId] = useState<number | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [theatersForSelectedMovie, setTheatersForSelectedMovie] = useState<TheaterMovie[]>([]);
  const [shows, setShows] = useState<ShowData[]>([]);
  const [selectedShow, setSelectedShow] = useState<ShowData | null>(null);
  const [selectedTheaterName, setSelectedTheaterName] = useState<string | null>(null);
  const [selectedMovieName, setSelectedMovieName] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>("http://localhost:9001/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchTheaterMovies = async () => {
      try {
        const response = await axios.get<TheaterMovie[]>("http://localhost:9001/theaters-movies");
        setTheaterMovies(response.data);
      } catch (error) {
        console.error("Error fetching theater movies:", error);
      }
    };

    fetchMovies();
    fetchTheaterMovies();
  }, []);

  const handleBookClick = (movieId: number) => {
    const theaters = theaterMovies.filter((tm) => tm.movie_id === movieId);
    setTheatersForSelectedMovie(theaters);
    setSelectedMovieId(movieId);
    const selectedMovie = movies.find((movie) => movie.id === movieId);
    if (selectedMovie) {
      setSelectedMovieName(selectedMovie.name);
    }
    setDialogOpen(true);
  };

  const handleTheaterSelect = async (theaterId: number, theaterName: string) => {
    setSelectedTheaterId(theaterId);
    setSelectedTheaterName(theaterName);
    
    
    try {
      const response = await axios.get<ShowData[]>(`http://localhost:9001/shows/${theaterId}`);
      setShows(response.data);
    } catch (error) {
      console.error("Error fetching shows:", error);
    }
    
    setDialogOpen(false); 
  };

  const handleShowSelect = (show: ShowData) => {
    setSelectedShow(show);
    setSeatLayoutDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTheaterId(null);
    setTheatersForSelectedMovie([]);
  };
  
  

  const handleCloseSeatLayoutDialog = () => {
    setSeatLayoutDialogOpen(false);
    setSelectedShow(null);
    setSelectedTheaterId(null);
    setSelectedMovieId(null);
    setSelectedTheaterName(null);
    setSelectedMovieName(null);
  };

  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={1}>
      <Box margin={"auto"} height={"40%"} width={"80%"} marginTop={1}>
        <Carousel autoplay speed={1500}>
          <div>
            <img
              src="https://i.pinimg.com/736x/7b/04/16/7b0416a509fd2b88ca49765af4089002.jpg"
              alt="Image 1"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://wallpaperaccess.com/full/7978053.jpg"
              alt="Image 2"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://images.spiderum.com/sp-images/8d5590c080e311ed8a6481196edc880f.jpeg"
              alt="Image 3"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://wallpapercave.com/wp/wp1839580.jpg"
              alt="Image 4"
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
            />
          </div>
               
        </Carousel>
        

      </Box>
     










      <Box padding={2} margin={"auto"}>
        <Typography variant="h5" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>

      <Box display={"flex"} width={"95%"} justifyContent={"center"} flexWrap={"wrap"}>
        {movies.map((movie) => (
          <Cards
            key={movie.id}
            name={movie.name}
            release_date={movie.release_date}
            poster_url={movie.poster_url}
            theaterName={
              theaterMovies.filter((tm) => tm.movie_id === movie.id).length > 0
                ? "IN CINEMAS NOW"
                : "coming soon"
            }
            onBookClick={() => handleBookClick(movie.id)}
          />
        ))}
      </Box>

      <Box display={"flex"} padding={"5"} margin={"auto"}>
        <Button
          component={Link}
          to="/movies"
          sx={{ margin: "auto", color: "#2b2d42" }}
          size="small"
          variant="outlined"
        >
          View All Movies
        </Button>
      </Box>

      
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Select a Theater</DialogTitle>
        <DialogContent>
          {theatersForSelectedMovie.length > 0 ? (
            theatersForSelectedMovie.map((theater) => (
              <Button
                key={theater.theater_id}
                variant="contained"
                onClick={() =>
                  handleTheaterSelect(theater.theater_id, theater.theater_name)
                }
                sx={{ margin: 1 }}
              >
                {theater.theater_name}
              </Button>
            ))
          ) : (
            <Typography>No theaters available for this movie.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={selectedTheaterId !== null && shows.length > 0}>
        <DialogTitle>Select a Show</DialogTitle>
        <DialogContent>
          {shows.length > 0 ? (
            <ShowsButtons shows={shows} onShowSelect={handleShowSelect} />
          ) : (
            <Typography>No shows available for this theater.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTheaterId(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      
      <Dialog open={seatLayoutDialogOpen} onClose={handleCloseSeatLayoutDialog} fullWidth  
            maxWidth={false} // This ensures the dialog spans the full width of the screen
            sx={{ height: '750px',bgcolor: 'white', }} >
        <DialogTitle>Select seats</DialogTitle>
        <DialogContent>
          {selectedTheaterId && selectedMovieId && selectedShow && selectedTheaterName && selectedMovieName && (
            <FetchedSeatLayout
              theaterId={selectedTheaterId?.toString()!}
              movieId={selectedMovieId?.toString()!}
              theaterName={selectedTheaterName!}
              movieName={selectedMovieName!}
              showTime={selectedShow.start_time} // Pass showTime prop
              onClose={handleCloseSeatLayoutDialog}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSeatLayoutDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;


