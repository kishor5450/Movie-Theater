// import {
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
// } from "@mui/material";
// import React from "react";


// interface CardsProps {
//   name: string;
//   release_date: string;
//   poster_url: string;
//   theaterName: string;
// }

// const Cards: React.FC<CardsProps> = ({ name, release_date, poster_url, theaterName }) => {
//   return (
//     <Card
//       sx={{
//         margin: 5,
//         width: 250,
//         height: 300,
//         borderRadius: 5,
//         ":hover": {
//           boxShadow: "10px 10px 20px #ccc",
//         },
//       }}
//     >
//       <img height={"50%"} width={"100%"} src={poster_url} alt={name} />

//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {name}
//         </Typography>
//         {/* Display the theater name */}
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           Playing at: {theaterName}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {new Date(release_date).toDateString()}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button sx={{ margin: "auto" }} size="small">
//           Book
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default Cards;
// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
// } from "@mui/material";


// interface CardsProps {
//   name: string;
//   release_date: string; 
//   poster_url: string; 
//   theaterName: string; 
//   onBookClick: () => void; 
// }

// const Cards: React.FC<CardsProps> = ({
//   name,
//   release_date,
//   poster_url,
//   theaterName,
//   onBookClick,
// }) => {
//   return (
//     <Card
//       sx={{
//         margin: 5,
//         width: 250,
//         height: 380,
//         borderRadius: 5,
//         ":hover": {
//           boxShadow: "10px 10px 20px #ccc",
//         },
//       }}
//     >
//       <img height={"55%"} width={"100%"} src={poster_url} alt={name} />

//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {name}
//         </Typography>
      
//         <Typography variant="body2" sx={{ color: "red" }}>
//           {theaterName}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {new Date(release_date).toDateString()}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           sx={{ margin: "auto", marginBottom: "20px" }}
//           size="large" 
//           onClick={onBookClick}
//         >
//           Book
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default Cards;

// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   CardActions,
//   Button,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// interface CardsProps {
//   name: string;
//   release_date: string;
//   poster_url: string;
//   theaterName: string;
//   onBookClick: () => void; 
// }

// const Cards: React.FC<CardsProps> = ({
//   name,
//   release_date,
//   poster_url,
//   theaterName,
// }) => {
//   const navigate = useNavigate(); // Initialize navigate hook

//   const handleBookClick = () => {
//     navigate("/bookings"); // Navigate to /bookings on button click
//   };

//   return (
//     <Card
//       sx={{
//         margin: 5,
//         width: 250,
//         height: 380,
//         borderRadius: 5,
//         ":hover": {
//           boxShadow: "10px 10px 20px #ccc",
//         },
//       }}
//     >
//       <img height={"55%"} width={"100%"} src={poster_url} alt={name} />

//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {name}
//         </Typography>

//         <Typography variant="body2" sx={{ color: "red" }}>
//           {theaterName}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {new Date(release_date).toDateString()}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           sx={{ margin: "auto", marginBottom: "20px" }}
//           size="large"
//           onClick={handleBookClick} // Call the navigate function here
//         >
//           Book
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default Cards;
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface CardsProps {
  name: string;
  release_date: string;
  poster_url: string;
  theaterName: string;
  onBookClick: () => void; 
}

const Cards: React.FC<CardsProps> = ({
  name,
  release_date,
  poster_url,
  theaterName,
  onBookClick, 
}) => {
  return (
    <Card
      sx={{
        margin: 5,
        width: 250,
        height: 450, //380
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img height={"60%"} width={"100%"} src={poster_url} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "red" }}>
          {theaterName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {new Date(release_date).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ margin: "auto", marginBottom: "20px" }}
          size="large"
          onClick={onBookClick} 
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default Cards;


