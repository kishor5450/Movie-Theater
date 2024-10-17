var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promisePool } from "../database/database.js";
function MovieRouter(app) {
    // POST /movies
    app.post("/movies", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const movies = req.body;
        if (!Array.isArray(movies) || movies.length === 0) {
            return res
                .status(400)
                .json({ message: "Request body must be a non-empty array of movies." });
        }
        const query = "INSERT INTO movies (NAME, release_date, poster_url) VALUES ?";
        const values = movies.map((movie) => [
            movie.NAME,
            movie.release_date,
            movie.poster_url,
        ]);
        try {
            const [results] = yield promisePool.query(query, [values]);
            const newMovies = movies.map((movie, index) => ({
                id: results.insertId + index,
                NAME: movie.NAME,
                release_date: movie.release_date,
                poster_url: movie.poster_url,
            }));
            res.status(201).json(newMovies);
            console.log("Added movies:", newMovies);
        }
        catch (err) {
            console.error("Error inserting movies:", err);
            res.status(500).json({ message: "Error inserting movies" });
        }
    }));
    // GET /movies
    app.get("/movies", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM movies";
        try {
            const [results] = yield promisePool.query(query);
            res.json(results);
        }
        catch (err) {
            console.error("Error fetching movies:", err);
            res.status(500).json({ message: "Error fetching movies" });
        }
    }));
    // GET /movies/:id
    app.get("/movies/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.params.id, 10);
        if (isNaN(movieId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const query = "SELECT * FROM movies WHERE id = ?";
        try {
            const [results] = yield promisePool.query(query, [movieId]);
            if (results.length === 0) {
                return res.status(404).json({ message: "Movie not found" });
            }
            res.json(results[0]);
        }
        catch (err) {
            console.error("Error fetching movie:", err);
            res.status(500).json({ message: "Error fetching movie" });
        }
    }));
    // PUT /movies/:id
    app.put("/movies/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.params.id, 10);
        const { NAME, release_date, poster_url } = req.body;
        if (!NAME && !release_date && !poster_url) {
            return res.status(400).json({
                message: "At least one field (NAME, release_date, or poster_url) is required for update.",
            });
        }
        let query = "UPDATE movies SET";
        const queryParams = [];
        if (NAME) {
            query += " NAME = ?";
            queryParams.push(NAME);
        }
        if (release_date) {
            if (queryParams.length)
                query += ",";
            query += " release_date = ?";
            queryParams.push(release_date);
        }
        if (poster_url) {
            if (queryParams.length)
                query += ",";
            query += " poster_url = ?";
            queryParams.push(poster_url);
        }
        query += " WHERE id = ?";
        queryParams.push(movieId);
        try {
            const [results] = yield promisePool.query(query, queryParams);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Movie not found" });
            }
            res.status(200).json({ message: "Movie updated successfully" });
            console.log("Movie updated:", results);
        }
        catch (err) {
            console.error("Error updating movie:", err);
            res.status(500).json({ message: "Error updating movie" });
        }
    }));
    // DELETE /movies/:id
    app.delete("/movies/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const movieId = parseInt(req.params.id, 10);
        if (isNaN(movieId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const query = "DELETE FROM movies WHERE id = ?";
        try {
            const [results] = yield promisePool.query(query, [movieId]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Movie not found" });
            }
            res.status(200).json({ message: "Movie deleted successfully" });
            console.log("Movie deleted:", results);
        }
        catch (err) {
            console.error("Error deleting movie:", err);
            res.status(500).json({ message: "Error deleting movie" });
        }
    }));
}
export default MovieRouter;
