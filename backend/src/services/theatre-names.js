var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promisePool } from '../database/database.js';
function TheaterRouter(app) {
    // Add a new theater
    app.post('/addtheater', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { name, area, city } = req.body;
        if (!name || !area || !city) {
            return res.status(400).json({ message: 'Missing required fields: name, area, and city.' });
        }
        const query = 'INSERT INTO theater (name, area, city) VALUES (?, ?, ?)';
        try {
            const [results] = yield promisePool.query(query, [name, area, city]);
            // Assuming results is of type ResultSetHeader
            const newTheater = { id: results.insertId, name, area, city }; // Use 'as any' to bypass type issues
            res.status(201).json(newTheater);
            console.log('Added theater:', newTheater);
        }
        catch (err) {
            console.error('Error inserting theater:', err);
            res.status(500).json({ message: 'Error inserting theater' });
        }
    }));
    // Get all theaters
    app.get('/theaters', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT t.*, ((ts.t_rows * ts.t_columns) - COUNT(nss.cell_indexes)) AS total_seats
                FROM theater t
                LEFT JOIN theater_seats ts ON ts.theater_id = t.id
                LEFT JOIN non_seating_space nss ON nss.theater_id = t.id
                GROUP BY t.id`;
        try {
            const [results] = yield promisePool.query(query);
            res.json(results);
        }
        catch (err) {
            console.error('Error fetching theaters:', err);
            res.status(500).json({ message: 'Error fetching theaters' });
        }
    }));
    app.get('/theaters/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const theaterId = Number(req.params.id);
        // Check if the ID is a valid number
        if (isNaN(theaterId) || theaterId <= 0) {
            return res.status(400).json({ message: 'Invalid theater ID. Please provide a positive number.' });
        }
        const query = 'SELECT * FROM theater WHERE id = ?';
        try {
            const [results] = yield promisePool.query(query, [theaterId]); // Specify type for results
            // Check if a theater was found
            if (results.length === 0) {
                return res.status(404).json({ message: 'Theater not found.' });
            }
            res.json(results[0]); // Return the first (and should be the only) theater found
            console.log('Theater details:', results[0]);
        }
        catch (err) {
            console.error('Error fetching theater by ID:', err);
            res.status(500).json({ message: 'Error fetching theater' });
        }
    }));
    // app.get('/theaters/:range?', async (req: Request, res: Response) => {
    //     const rangeParam = req.params.range;
    //     let query = 'SELECT * FROM theater';
    //     const queryParams: number[] = [];
    //     if (rangeParam) {
    //         const [start, end] = rangeParam.split(':').map(Number);
    //         if (isNaN(start) || isNaN(end) || start > end || start <= 0 || end <= 0) {
    //             return res.status(400).json({ message: 'Invalid range format. Use "start:end" with positive numbers.' });
    //         }
    //         query += ' WHERE id BETWEEN ? AND ?';
    //         queryParams.push(start, end);
    //     }
    //     try {
    //         const [results] = await promisePool.query(query, queryParams);
    //         res.json(results);
    //         console.log('Theaters list for range:', results);
    //     } catch (err) {
    //         console.error('Error fetching theaters by range:', err);
    //         res.status(500).json({ message: 'Error fetching theaters' });
    //     }
    // });
    // Delete a theater by ID
    app.delete('/theaters/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const theaterId = parseInt(req.params.id, 10);
        if (isNaN(theaterId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const deleteTheaterSeatsQuery = 'DELETE FROM theater_seats WHERE theater_id = ?';
        const deleteNonSeatingSpacesQuery = 'DELETE FROM non_seating_space WHERE theater_id = ?';
        const deleteTheaterQuery = 'DELETE FROM theater WHERE id = ?';
        try {
            // Start a transaction
            yield promisePool.query('START TRANSACTION');
            // Delete related theater seats
            yield promisePool.query(deleteTheaterSeatsQuery, [theaterId]);
            // Delete related non-seating spaces
            yield promisePool.query(deleteNonSeatingSpacesQuery, [theaterId]);
            // Then delete the theater
            const [results] = yield promisePool.query(deleteTheaterQuery, [theaterId]);
            if (results.affectedRows === 0) {
                // If no rows were affected, the theater was not found
                yield promisePool.query('ROLLBACK');
                return res.status(404).json({ message: 'Theater not found' });
            }
            // Commit the transaction
            yield promisePool.query('COMMIT');
            res.status(200).json({ message: 'Theater deleted successfully' });
            console.log('Theater deleted:', results);
        }
        catch (err) {
            // Rollback transaction in case of an error
            yield promisePool.query('ROLLBACK');
            console.error('Error deleting theater:', err);
            res.status(500).json({ message: 'Error deleting theater' });
        }
    }));
    // Update a theater by ID
    app.put('/theaters/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const theaterId = parseInt(req.params.id, 10);
        const { name, area, city } = req.body;
        if (!name && !area && !city) {
            return res.status(400).json({ message: 'At least one field (name, area, or city) is required for update.' });
        }
        let query = 'UPDATE theater SET';
        const queryParams = [];
        if (name) {
            query += ' name = ?';
            queryParams.push(name);
        }
        if (area) {
            if (queryParams.length)
                query += ',';
            query += ' area = ?';
            queryParams.push(area);
        }
        if (city) {
            if (queryParams.length)
                query += ',';
            query += ' city = ?';
            queryParams.push(city);
        }
        query += ' WHERE id = ?';
        queryParams.push(theaterId);
        try {
            const [results] = yield promisePool.query(query, queryParams);
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Theater not found' });
            }
            res.status(200).json({ message: 'Theater updated successfully' });
            console.log('Theater updated:', results);
        }
        catch (err) {
            console.error('Error updating theater:', err);
            res.status(500).json({ message: 'Error updating theater' });
        }
    }));
}
export default TheaterRouter;
