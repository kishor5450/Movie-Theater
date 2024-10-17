// import express from 'express';
// import cors from 'cors';
// import MovieRouter from './src/services/movies';
// import TheaterRouter from './src/services/theatre-names';
// import NonSeatingRoutes from './src/services/theatre-non-sitting-sapce';
// import TheaterRowseats from './src/services/theatre-row-seats';
// import TheatreSeats from './src/services/theatre-seats.js';
// const app = express();
// const PORT = 9001;
// app.use(cors());
// app.use(express.json());
// // Register routes
// NonSeatingRoutes(app);
// TheaterRouter(app);
// TheaterRowseats(app);
// TheatreSeats(app);
// MovieRouter(app);
// // Optionally handle promisePool usage if needed
// // await promisePool; // Uncomment if you need to await
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import MovieRouter from "./src/services/movies.js"; // Added .js extension
import TheaterRouter from "./src/services/theatre-names.js"; // Added .js extension
import NonSeatingRoutes from "./src/services/theatre-non-sitting-sapce.js"; // Fixed typo and added .js
import TheaterRowseats from "./src/services/theatre-row-seats.js"; // Added .js extension
import TheatreSeats from "./src/services/theatre-seats.js"; // Already correct
import TheaterMovie from "./src/services/theaterAndMovie.js";

const app = express();
const PORT = 9001;
app.use(cors());
app.use(express.json());
// Register routes
NonSeatingRoutes(app);
TheaterRouter(app);
TheaterRowseats(app);
TheatreSeats(app);
MovieRouter(app);
TheaterMovie(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
