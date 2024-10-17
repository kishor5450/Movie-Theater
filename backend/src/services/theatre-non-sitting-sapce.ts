import { Express, Request, Response } from 'express';
import  promisePool  from '../database/database.js'; 

function NonSeatingRoutes(app: Express) {
    app.post('/non_seating_space', async (req: Request, res: Response) => {
        const { theater_id, info } = req.body;

        // Basic validation
        if (!theater_id || !info || !Array.isArray(info)) {
            return res.status(400).json({ message: 'Missing required fields: theater_id and info.' });
        }

        // Validate that each item in `info` has `trow_number` and `cell_indexes`
        for (let entry of info) {
            if (!entry.trow_number || !entry.cell_indexes) {
                return res.status(400).json({ message: 'Each entry in info must have trow_number and cell_indexes.' });
            }
        }

        const query = 'INSERT INTO non_seating_space (theater_id, trow_number, cell_indexes) VALUES (?, ?, ?)';

        try {
            const results: Array<{ id: number; theater_id: number; trow_number: number; cell_indexes: any }> = [];

            // Loop through each entry in the `info` array and insert them into the database
            for (let entry of info) {
                const { trow_number, cell_indexes } = entry;
                const [result] = await promisePool.query(query, [theater_id, trow_number, cell_indexes]);

                // Use type assertion to access insertId
                results.push({ id: (result as any).insertId, theater_id, trow_number, cell_indexes });
            }

            res.status(201).json({ message: 'Non-seating spaces added successfully', results });
            console.log('Added non-seating spaces:', results);
        } catch (err) {
            console.error('Error inserting non-seating space:', err);
            res.status(500).json({ message: 'Error inserting non-seating spaces' });
        }
    });

    app.get('/non_seating_space', async (req: Request, res: Response) => {
        const query = 'SELECT * FROM non_seating_space';
        try {
            const [results] = await promisePool.query(query);
            res.json(results);
            console.log('Fetched all non-seating spaces:', results);
        } catch (err) {
            console.error('Error fetching non-seating spaces:', err);
            res.status(500).json({ message: 'Error fetching non-seating spaces' });
        }
    });

    app.get('/non_seating_space/:id', async (req: Request, res: Response) => {
        const spaceId = parseInt(req.params.id, 10);
        if (isNaN(spaceId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const query = 'SELECT * FROM non_seating_space WHERE id = ?';
        try {
            const [results] = await promisePool.query(query, [spaceId]);
            // Check if results is an array
            if (!Array.isArray(results) || results.length === 0) {
                return res.status(404).json({ message: 'Non-seating space not found' });
            }
            res.json(results[0]);
            console.log('Fetched non-seating space:', results[0]);
        } catch (err) {
            console.error('Error fetching non-seating space:', err);
            res.status(500).json({ message: 'Error fetching non-seating space' });
        }
    });

    app.put('/non_seating_space/:id', async (req: Request, res: Response) => {
        const spaceId = parseInt(req.params.id, 10);
        const { theater_id, trow_number, cell_indexes } = req.body;

        if (!theater_id && !trow_number && !cell_indexes) {
            return res.status(400).json({ message: 'At least one field (theater_id, trow_number, or cell_indexes) is required for update.' });
        }

        let query = 'UPDATE non_seating_space SET';
        const queryParams: Array<number | string> = [];

        if (theater_id) {
            query += ' theater_id = ?';
            queryParams.push(theater_id);
        }
        if (trow_number) {
            if (queryParams.length) query += ',';
            query += ' trow_number = ?';
            queryParams.push(trow_number);
        }
        if (cell_indexes) {
            if (queryParams.length) query += ',';
            query += ' cell_indexes = ?';
            queryParams.push(cell_indexes);
        }
        query += ' WHERE id = ?';
        queryParams.push(spaceId);

        try {
            const [results] = await promisePool.query(query, queryParams);
            // Use type assertion to access affectedRows
            if ((results as any).affectedRows === 0) {
                return res.status(404).json({ message: 'Non-seating space not found' });
            }
            res.status(200).json({ message: 'Non-seating space updated successfully' });
            console.log('Updated non-seating space:', results);
        } catch (err) {
            console.error('Error updating non-seating space:', err);
            res.status(500).json({ message: 'Error updating non-seating space' });
        }
    });

    app.delete('/non_seating_space/:id', async (req: Request, res: Response) => {
        const spaceId = parseInt(req.params.id, 10);
        if (isNaN(spaceId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const query = 'DELETE FROM non_seating_space WHERE id = ?';
        try {
            const [results] = await promisePool.query(query, [spaceId]);
            // Use type assertion to access affectedRows
            if ((results as any).affectedRows === 0) {
                return res.status(404).json({ message: 'Non-seating space not found' });
            }
            res.status(200).json({ message: 'Non-seating space deleted successfully' });
            console.log('Deleted non-seating space:', results);
        } catch (err) {
            console.error('Error deleting non-seating space:', err);
            res.status(500).json({ message: 'Error deleting non-seating space' });
        }
    });
}

export default NonSeatingRoutes;
