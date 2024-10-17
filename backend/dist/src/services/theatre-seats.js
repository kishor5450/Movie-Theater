var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import promisePool from "../database/database"; // Ensure this import is correct
function theaterseats(app) {
    // Add new theater seating configuration
    app.post("/theater_seats", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { theater_id, t_rows, t_columns } = req.body;
        if (theater_id === undefined ||
            t_rows === undefined ||
            t_columns === undefined) {
            return res.status(400).json({
                message: "Missing required fields: theater_id, t_rows, and t_columns.",
            });
        }
        const query = "INSERT INTO theater_seats (theater_id, t_rows, t_columns) VALUES (?, ?, ?)";
        try {
            const [results] = yield promisePool.query(query, [
                theater_id,
                t_rows,
                t_columns,
            ]);
            const newConfig = { id: results.insertId, theater_id, t_rows, t_columns };
            res.status(201).json(newConfig);
            console.log("Added theater seating configuration:", newConfig);
        }
        catch (err) {
            console.error("Error inserting theater seating configuration:", err);
            res
                .status(500)
                .json({ message: "Error inserting theater seating configuration" });
        }
    }));
    // Get seating configuration for a specific theater
    // Get seating configuration for a specific theater
    app.get("/theater_seats/:theaterId", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const theaterId = parseInt(req.params.theaterId, 10);
        if (isNaN(theaterId)) {
            return res.status(400).json({ message: "Invalid theater ID format" });
        }
        // Query to fetch seating configurations by theater_id
        const query = "SELECT * FROM theater_seats WHERE theater_id = ?";
        try {
            const [results] = yield promisePool.query(query, [theaterId]);
            // Check if results array is empty
            if (results.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Theater seating configuration not found" });
            }
            // Return the first matching record
            res.json(results[0]);
            console.log("Fetched theater seating configuration:", results[0]);
        }
        catch (err) {
            console.error("Error fetching theater seating configuration:", err);
            res
                .status(500)
                .json({ message: "Error fetching theater seating configuration" });
        }
    }));
    // Get all theater seating configurations
    app.get("/theater_seats", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM theater_seats";
        try {
            const [results] = yield promisePool.query(query);
            res.json(results);
            console.log("Fetched all theater seating configurations:", results);
        }
        catch (err) {
            console.error("Error fetching theater seating configurations:", err);
            res
                .status(500)
                .json({ message: "Error fetching theater seating configurations" });
        }
    }));
    // Get a specific theater seating configuration by ID
    app.get("/theater_seats/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const configId = parseInt(req.params.id, 10);
        if (isNaN(configId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const query = "SELECT * FROM theater_seats WHERE id = ?";
        try {
            const [results] = yield promisePool.query(query, [configId]);
            if (results.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Theater seating configuration not found" });
            }
            res.json(results[0]);
            console.log("Fetched theater seating configuration:", results[0]);
        }
        catch (err) {
            console.error("Error fetching theater seating configuration:", err);
            res
                .status(500)
                .json({ message: "Error fetching theater seating configuration" });
        }
    }));
    // Update a theater seating configuration by ID
    app.put("/theater_seats/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const configId = parseInt(req.params.id, 10);
        const { theater_id, t_rows, t_columns } = req.body;
        if (isNaN(configId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        if (theater_id === undefined &&
            t_rows === undefined &&
            t_columns === undefined) {
            return res.status(400).json({
                message: "At least one field (theater_id, t_rows, or t_columns) is required for update.",
            });
        }
        let query = "UPDATE theater_seats SET";
        const queryParams = [];
        if (theater_id !== undefined) {
            query += " theater_id = ?";
            queryParams.push(theater_id);
        }
        if (t_rows !== undefined) {
            if (queryParams.length)
                query += ",";
            query += " t_rows = ?";
            queryParams.push(t_rows);
        }
        if (t_columns !== undefined) {
            if (queryParams.length)
                query += ",";
            query += " t_columns = ?";
            queryParams.push(t_columns);
        }
        query += " WHERE id = ?";
        queryParams.push(configId);
        try {
            const [results] = yield promisePool.query(query, queryParams);
            if (results.affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Theater seating configuration not found" });
            }
            res.status(200).json({
                message: "Theater seating configuration updated successfully",
            });
            console.log("Updated theater seating configuration:", results);
        }
        catch (err) {
            console.error("Error updating theater seating configuration:", err);
            res
                .status(500)
                .json({ message: "Error updating theater seating configuration" });
        }
    }));
    // Delete a theater seating configuration by ID
    app.delete("/theater_seats/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const configId = parseInt(req.params.id, 10);
        if (isNaN(configId)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const query = "DELETE FROM theater_seats WHERE id = ?";
        try {
            const [results] = yield promisePool.query(query, [configId]);
            if (results.affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "Theater seating configuration not found" });
            }
            res.status(200).json({
                message: "Theater seating configuration deleted successfully",
            });
            console.log("Deleted theater seating configuration:", results);
        }
        catch (err) {
            console.error("Error deleting theater seating configuration:", err);
            res
                .status(500)
                .json({ message: "Error deleting theater seating configuration" });
        }
    }));
}
export default theaterseats;
