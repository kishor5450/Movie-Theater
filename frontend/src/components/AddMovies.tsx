import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, message } from "antd"; 

interface Movie {
  id: number; 
  name: string;
  release_date: string; 
}

const MovieManagement: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovie, setNewMovie] = useState<string>("");
  const [newMovieDate, setNewMovieDate] = useState<string>("");

  const [editMovie, setEditMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get<Movie[]>("http://localhost:9001/movies");
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  
  const addMovie = async () => {
    
    if (!newMovie || !newMovieDate) {
      message.error("Please provide both movie name and release date.");
      return;
    }

    const req = {
      name: newMovie.trim(), 
      release_date: newMovieDate,
    };

    console.log("Payload being sent:", req);

    try {
      const response = await axios.post<Movie>("http://localhost:9001/movies", req);
      console.log("Movie added:", response.data);
      fetchMovies(); 
      message.success("Movie added successfully!");
    } catch (err) {
      console.error("Error adding movie:", err);
      message.error("Failed to add movie. Check the input data.");
    }
  };

  return (
    <div>
      <h1>Movie Management</h1>

      {/* Add New Movie Form */}
      <div>
        <h2>Add a new movie</h2>
        <Input
          type="text"
          placeholder="Movie Name"
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Release Date"
          value={newMovieDate}
          onChange={(e) => setNewMovieDate(e.target.value)}
        />
        <Button onClick={addMovie}>Add Movie</Button>
      </div>

      {/* Movie List */}
      <h2>Movie List</h2>
      {loading ? (
        <div>Loading movies...</div>
      ) : (
        movies.map((movie) => (
          <div key={movie.id}>
            <p>
              {movie.name} - {movie.release_date}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieManagement;
