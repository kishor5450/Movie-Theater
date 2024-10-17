import express, { Request, Response, Application } from "express";
import  promisePool from "../database/database.js";

interface Movie {
  id?: number;
  NAME: string;
  release_date: string;
  poster_url: string;
}

function MovieRouter(app: Application) {
  // POST /movies
  app.post("/movies", async (req: Request, res: Response) => {
    const movies: Movie[] = req.body;

    if (!Array.isArray(movies) || movies.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must be a non-empty array of movies." });
    }

    const query =
      "INSERT INTO movies (NAME, release_date, poster_url) VALUES ?";
    const values = movies.map((movie) => [
      movie.NAME,
      movie.release_date,
      movie.poster_url,
    ]);

    try {
      const [results]: any = await promisePool.query(query, [values]);
      const newMovies = movies.map((movie, index) => ({
        id: results.insertId + index,
        NAME: movie.NAME,
        release_date: movie.release_date,
        poster_url: movie.poster_url,
      }));

      res.status(201).json(newMovies);
      console.log("Added movies:", newMovies);
    } catch (err) {
      console.error("Error inserting movies:", err);
      res.status(500).json({ message: "Error inserting movies" });
    }
  });

  // GET /movies
  app.get("/movies", async (req: Request, res: Response) => {
    const query = "SELECT * FROM movies";
    try {
      const [results]: any = await promisePool.query(query);
      res.json(results);
    } catch (err) {
      console.error("Error fetching movies:", err);
      res.status(500).json({ message: "Error fetching movies" });
    }
  });

  // GET /movies/:id
  app.get("/movies/:id", async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const query = "SELECT * FROM movies WHERE id = ?";
    try {
      const [results]: any = await promisePool.query(query, [movieId]);
      if (results.length === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.json(results[0]);
    } catch (err) {
      console.error("Error fetching movie:", err);
      res.status(500).json({ message: "Error fetching movie" });
    }
  });

  // PUT /movies/:id
  app.put("/movies/:id", async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id, 10);
    const { NAME, release_date, poster_url }: Partial<Movie> = req.body;

    if (!NAME && !release_date && !poster_url) {
      return res.status(400).json({
        message:
          "At least one field (NAME, release_date, or poster_url) is required for update.",
      });
    }

    let query = "UPDATE movies SET";
    const queryParams: any[] = [];

    if (NAME) {
      query += " NAME = ?";
      queryParams.push(NAME);
    }
    if (release_date) {
      if (queryParams.length) query += ",";
      query += " release_date = ?";
      queryParams.push(release_date);
    }
    if (poster_url) {
      if (queryParams.length) query += ",";
      query += " poster_url = ?";
      queryParams.push(poster_url);
    }
    query += " WHERE id = ?";
    queryParams.push(movieId);

    try {
      const [results]: any = await promisePool.query(query, queryParams);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json({ message: "Movie updated successfully" });
      console.log("Movie updated:", results);
    } catch (err) {
      console.error("Error updating movie:", err);
      res.status(500).json({ message: "Error updating movie" });
    }
  });

  // DELETE /movies/:id
  app.delete("/movies/:id", async (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id, 10);
    if (isNaN(movieId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const query = "DELETE FROM movies WHERE id = ?";
    try {
      const [results]: any = await promisePool.query(query, [movieId]);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(200).json({ message: "Movie deleted successfully" });
      console.log("Movie deleted:", results);
    } catch (err) {
      console.error("Error deleting movie:", err);
      res.status(500).json({ message: "Error deleting movie" });
    }
  });
}

export default MovieRouter;
