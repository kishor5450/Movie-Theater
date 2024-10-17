var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import promisePool from "../database/database.js";
function BookingRouter(app) {
    // POST /bookings
    app.post("/bookings", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const bookings = req.body;
        if (!Array.isArray(bookings) || bookings.length === 0) {
            return res
                .status(400)
                .json({ message: "Request body must be a non-empty array of bookings." });
        }
        const query = "INSERT INTO moviebooking (theater_id, movie_id, theater_name, movie_name, bookingdate, seats) VALUES ?";
        const values = bookings.map((booking) => [
            booking.theater_id,
            booking.movie_id,
            booking.theater_name,
            booking.movie_name,
            booking.bookingdate,
            booking.seats,
        ]);
        try {
            const [results] = yield promisePool.query(query, [values]);
            const newBookings = bookings.map((booking, index) => ({
                id: results.insertId + index,
                theater_id: booking.theater_id,
                movie_id: booking.movie_id,
                theater_name: booking.theater_name,
                movie_name: booking.movie_name,
                bookingdate: booking.bookingdate,
                seats: booking.seats,
            }));
            res.status(201).json(newBookings);
            console.log("Added bookings:", newBookings);
        }
        catch (err) {
            console.error("Error inserting bookings:", err);
            res.status(500).json({ message: "Error inserting bookings" });
        }
    }));
    // GET /bookings
    app.get("/bookings", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM moviebooking";
        try {
            const [results] = yield promisePool.query(query);
            res.json(results);
        }
        catch (err) {
            console.error("Error fetching bookings:", err);
            res.status(500).json({ message: "Error fetching bookings" });
        }
    }));
    // GET /bookings/:id
    app.get("/bookings/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const bookingId = parseInt(req.params.id, 10);
        if (isNaN(bookingId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const query = "SELECT * FROM moviebooking WHERE id = ?";
        try {
            const [results] = yield promisePool.query(query, [bookingId]);
            if (results.length === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.json(results[0]);
        }
        catch (err) {
            console.error("Error fetching booking:", err);
            res.status(500).json({ message: "Error fetching booking" });
        }
    }));
    // PUT /bookings/:id
    app.put("/bookings/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const bookingId = parseInt(req.params.id, 10);
        const { theater_id, movie_id, theater_name, movie_name, bookingdate, seats } = req.body;
        if (!theater_id && !movie_id && !theater_name && !movie_name && !bookingdate && !seats) {
            return res.status(400).json({
                message: "At least one field must be provided for update.",
            });
        }
        let query = "UPDATE moviebooking SET";
        const queryParams = [];
        if (theater_id) {
            query += " theater_id = ?";
            queryParams.push(theater_id);
        }
        if (movie_id) {
            if (queryParams.length)
                query += ",";
            query += " movie_id = ?";
            queryParams.push(movie_id);
        }
        if (theater_name) {
            if (queryParams.length)
                query += ",";
            query += " theater_name = ?";
            queryParams.push(theater_name);
        }
        if (movie_name) {
            if (queryParams.length)
                query += ",";
            query += " movie_name = ?";
            queryParams.push(movie_name);
        }
        if (bookingdate) {
            if (queryParams.length)
                query += ",";
            query += " bookingdate = ?";
            queryParams.push(bookingdate);
        }
        if (seats) {
            if (queryParams.length)
                query += ",";
            query += " seats = ?";
            queryParams.push(seats);
        }
        query += " WHERE id = ?";
        queryParams.push(bookingId);
        try {
            const [results] = yield promisePool.query(query, queryParams);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({ message: "Booking updated successfully" });
            console.log("Booking updated:", results);
        }
        catch (err) {
            console.error("Error updating booking:", err);
            res.status(500).json({ message: "Error updating booking" });
        }
    }));
    // DELETE /bookings/:id
    app.delete("/bookings/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const bookingId = parseInt(req.params.id, 10);
        if (isNaN(bookingId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const query = "DELETE FROM moviebooking WHERE id = ?";
        try {
            const [results] = yield promisePool.query(query, [bookingId]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({ message: "Booking deleted successfully" });
            console.log("Booking deleted:", results);
        }
        catch (err) {
            console.error("Error deleting booking:", err);
            res.status(500).json({ message: "Error deleting booking" });
        }
    }));
}
export default BookingRouter;
