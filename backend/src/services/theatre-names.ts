import { Express, Request, Response } from 'express';
import  promisePool from '../database/database.js'; 

function TheaterRouter(app: Express) {

    app.post('/addtheater', async (req: Request, res: Response) => {
        const { name, area, city } = req.body;

        if (!name || !area || !city) {
            return res.status(400).json({ message: 'Missing required fields: name, area, and city.' });
        }

        const query = 'INSERT INTO theater (name, area, city) VALUES (?, ?, ?)';
        try {
            const [results] = await promisePool.query(query, [name, area, city]);

           
            const newTheater = { id: (results as any).insertId, name, area, city }; 
            res.status(201).json(newTheater);
            console.log('Added theater:', newTheater);
        } catch (err) {
            console.error('Error inserting theater:', err);
            res.status(500).json({ message: 'Error inserting theater' });
        }
    });

   
    app.get('/theaters', async (req: Request, res: Response) => {
        const query = `SELECT t.*, ((ts.t_rows * ts.t_columns) - COUNT(nss.cell_indexes)) AS total_seats
                FROM theater t
                LEFT JOIN theater_seats ts ON ts.theater_id = t.id
                LEFT JOIN non_seating_space nss ON nss.theater_id = t.id
                GROUP BY t.id`;
        try {
            const [results] = await promisePool.query(query);
            res.json(results);
        } catch (err) {
            console.error('Error fetching theaters:', err);
            res.status(500).json({ message: 'Error fetching theaters' });
        }
    });


    
app.get('/theaters/:id', async (req: Request, res: Response) => {
    const theaterId = Number(req.params.id);


    if (isNaN(theaterId) || theaterId <= 0) {
        return res.status(400).json({ message: 'Invalid theater ID. Please provide a positive number.' });
    }

    const query = 'SELECT * FROM theater WHERE id = ?';

    try {
        const [results] = await promisePool.query<any[]>(query, [theaterId]); 

        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Theater not found.' });
        }

        res.json(results[0]); 
        console.log('Theater details:', results[0]);
    } catch (err) {
        console.error('Error fetching theater by ID:', err);
        res.status(500).json({ message: 'Error fetching theater' });
    }
});

    
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
    app.delete('/theaters/:id', async (req: Request, res: Response) => {
        const theaterId = parseInt(req.params.id, 10);

        if (isNaN(theaterId)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deleteTheaterSeatsQuery = 'DELETE FROM theater_seats WHERE theater_id = ?';
        const deleteNonSeatingSpacesQuery = 'DELETE FROM non_seating_space WHERE theater_id = ?';
        const deleteTheaterQuery = 'DELETE FROM theater WHERE id = ?';

        try {
            // Start a transaction
            await promisePool.query('START TRANSACTION');

            // Delete related theater seats
            await promisePool.query(deleteTheaterSeatsQuery, [theaterId]);

            // Delete related non-seating spaces
            await promisePool.query(deleteNonSeatingSpacesQuery, [theaterId]);

            // Then delete the theater
            const [results] = await promisePool.query(deleteTheaterQuery, [theaterId]);

            if ((results as any).affectedRows === 0) {
                // If no rows were affected, the theater was not found
                await promisePool.query('ROLLBACK');
                return res.status(404).json({ message: 'Theater not found' });
            }

            // Commit the transaction
            await promisePool.query('COMMIT');
            res.status(200).json({ message: 'Theater deleted successfully' });
            console.log('Theater deleted:', results);
        } catch (err) {
            // Rollback transaction in case of an error
            await promisePool.query('ROLLBACK');
            console.error('Error deleting theater:', err);
            res.status(500).json({ message: 'Error deleting theater' });
        }
    });

    // Update a theater by ID
    app.put('/theaters/:id', async (req: Request, res: Response) => {
        const theaterId = parseInt(req.params.id, 10);
        const { name, area, city } = req.body;

        if (!name && !area && !city) {
            return res.status(400).json({ message: 'At least one field (name, area, or city) is required for update.' });
        }

        let query = 'UPDATE theater SET';
        const queryParams: (string | number)[] = [];

        if (name) {
            query += ' name = ?';
            queryParams.push(name);
        }
        if (area) {
            if (queryParams.length) query += ',';
            query += ' area = ?';
            queryParams.push(area);
        }
        if (city) {
            if (queryParams.length) query += ',';
            query += ' city = ?';
            queryParams.push(city);
        }
        query += ' WHERE id = ?';
        queryParams.push(theaterId);

        try {
            const [results] = await promisePool.query(query, queryParams);
            if ((results as any).affectedRows === 0) {
                return res.status(404).json({ message: 'Theater not found' });
            }
            res.status(200).json({ message: 'Theater updated successfully' });
            console.log('Theater updated:', results);
        } catch (err) {
            console.error('Error updating theater:', err);
            res.status(500).json({ message: 'Error updating theater' });
        }
    });
}

export default TheaterRouter;
