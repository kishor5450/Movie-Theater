var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import promisePool from '../database/database.js';
function TheaterRowseats(app) {
    // Add new row seats
    app.post('/row_seats', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { theater_id, trow_number, seats_count } = req.body;
        if (!theater_id || !trow_number || seats_count === undefined) {
            return res.status(400).json({ message: 'Missing required fields: theater_id, trow_number, and seats_count.' });
        }
        const query = 'INSERT INTO row_seats (theater_id, trow_number, seats_count) VALUES (?, ?, ?)';
        try {
            const [results] = yield promisePool.query(query, [theater_id, trow_number, seats_count]);
            // Use type assertion for insertId
            const newRow = { id: results.insertId, theater_id, trow_number, seats_count };
            res.status(201).json(newRow);
            console.log('Added row seats:', newRow);
        }
        catch (err) {
            console.error('Error inserting row seats:', err);
            res.status(500).json({ message: 'Error inserting row seats' });
        }
    }));
    // Get all row seats
    app.get('/row_seats', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT * FROM row_seats';
        try {
            const [results] = yield promisePool.query(query);
            res.json(results);
            console.log('Fetched all row seats:', results);
        }
        catch (err) {
            console.error('Error fetching row seats:', err);
            res.status(500).json({ message: 'Error fetching row seats' });
        }
    }));
    // Get a specific row seat by ID
    app.get('/row_seats/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const rowSeatId = parseInt(req.params.id, 10);
        if (isNaN(rowSeatId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const query = 'SELECT * FROM row_seats WHERE id = ?';
        try {
            const [results] = yield promisePool.query(query, [rowSeatId]);
            // Check if results is an array
            if (!Array.isArray(results) || results.length === 0) {
                return res.status(404).json({ message: 'Row seat not found' });
            }
            res.json(results[0]);
            console.log('Fetched row seat:', results[0]);
        }
        catch (err) {
            console.error('Error fetching row seat:', err);
            res.status(500).json({ message: 'Error fetching row seat' });
        }
    }));
    app.put('/row_seats/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const rowSeatId = parseInt(req.params.id, 10);
        const { trow_number, seats_count } = req.body;
        if (isNaN(rowSeatId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        if (trow_number === undefined && seats_count === undefined) {
            return res.status(400).json({ message: 'At least one field (trow_number or seats_count) is required for update.' });
        }
        let query = 'UPDATE row_seats SET';
        const queryParams = [];
        if (trow_number !== undefined) {
            query += ' trow_number = ?';
            queryParams.push(trow_number);
        }
        if (seats_count !== undefined) {
            if (queryParams.length)
                query += ',';
            query += ' seats_count = ?';
            queryParams.push(seats_count);
        }
        query += ' WHERE id = ?';
        queryParams.push(rowSeatId);
        try {
            const [results] = yield promisePool.query(query, queryParams);
            // Use type assertion for affectedRows
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Row seat not found' });
            }
            res.status(200).json({ message: 'Row seat updated successfully' });
            console.log('Updated row seat:', results);
        }
        catch (err) {
            console.error('Error updating row seat:', err);
            res.status(500).json({ message: 'Error updating row seat' });
        }
    }));
    // Delete a row seat by ID
    app.delete('/row_seats/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const rowSeatId = parseInt(req.params.id, 10);
        if (isNaN(rowSeatId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const query = 'DELETE FROM row_seats WHERE id = ?';
        try {
            const [results] = yield promisePool.query(query, [rowSeatId]);
            // Use type assertion for affectedRows
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Row seat not found' });
            }
            res.status(200).json({ message: 'Row seat deleted successfully' });
            console.log('Deleted row seat:', results);
        }
        catch (err) {
            console.error('Error deleting row seat:', err);
            res.status(500).json({ message: 'Error deleting row seat' });
        }
    }));
}
export default TheaterRowseats;
