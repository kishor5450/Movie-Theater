import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Autocomplete, TextField } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import axios from "axios";

interface Movie {
  id: number;
  name: string; 
}

const Header: React.FC = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get<Movie[]>("http://localhost:9001/movies");
        setMovieList(response.data); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"50%"} margin={"auto"}>
          <Autocomplete
            freeSolo
            options={movieList.map((movie) => movie.name)} 
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Movies"
              />
            )}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
