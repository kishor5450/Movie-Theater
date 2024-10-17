// import React from "react";
// import { Button } from "antd";

// interface ShowData {
//   show_no: string;
//   start_time: string;
// }

// interface ShowsButtonsProps {
//   shows: ShowData[];
//   onShowSelect: (show: ShowData) => void; 
// }

// const ShowsButtons: React.FC<ShowsButtonsProps> = ({ shows }) => {
//   return (
//     <div style={{ padding: "10px" }}>
//       <h4>Available Shows</h4>
//       {shows.length > 0 ? (
//         shows.map((show, index) => (
//           <Button key={index} style={{ margin: "5px" }}>
//             {`Show ${show.show_no}: ${show.start_time}`}
//           </Button>
//         ))
//       ) : (
//         <p>No shows available.</p>
//       )}
//     </div>
//   );
// };

// export default ShowsButtons;
import React from "react";
import { Button, Box, Typography } from "@mui/material";

// Define the ShowData interface here
interface ShowData {
  show_no: string;
  start_time: string;
}

interface ShowsButtonsProps {
  shows: ShowData[];
  onShowSelect: (show: ShowData) => void;
}

const ShowsButtons: React.FC<ShowsButtonsProps> = ({ shows, onShowSelect }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {shows.map((show) => (
        <Button
          key={show.show_no}
          variant="contained"
          onClick={() => onShowSelect(show)}
          sx={{ margin: 1 }}
        >
          <Typography variant="body1">
         {show.start_time}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default ShowsButtons;


