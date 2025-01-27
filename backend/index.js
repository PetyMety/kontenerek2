import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'train'
}).promise();

app.get('/train', async (req, res) => {
    try {
        const temp = await db.query('SELECT * FROM trains');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving tablets ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})
app.patch('/train/:id', async (req, res) => {
    const trainId = await parseInt(req.params.id);
    const isStatus = await req.body.status;

    if (typeof isStatus !== 'string') {
        return res.status(400).json({ error: 'status must be a string value' });
    }

    try {
        const [result] = await db.query(
            'UPDATE trains SET Status = ? WHERE TrainID = ?',
            [isStatus, trainId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Status not found' });
        }

        res.status(200).json({ trainId, isStatus });
    } catch (error) {
        console.error(`Error updating train status: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/train', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
        const countResult = await db.query('SELECT COUNT(*) as total FROM trains');
        const total = countResult[0][0].total;
        const temp = await db.query('SELECT * FROM trains LIMIT ? OFFSET ?', [limit, offset]);
        const rows = temp[0];
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(`Error retrieving trains ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/train', async (req, res) => {
    console.log("wcwad");
    try {
        const mybody = await req.body.data;

        // Log the request body (you can remove this later if it's not needed)
        console.log("Received request to insert train data:");
        console.log(mybody);

        // Check if all required fields are provided
        const requiredFields = ['TrainType', 'TrainName', 'Operator', 'Route', 'DepartureTime', 'ArrivalTime', 'Status', 'Capacity'];
        for (let field of requiredFields) {
            if (!mybody[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }
        console.log(mybody)

        // Perform the insert query
        const result = await db.query(
            `INSERT INTO trains (TrainType, TrainName, Operator, Route, DepartureTime, ArrivalTime, Status, Capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                mybody.TrainType,
                mybody.TrainName,
                mybody.Operator,
                mybody.Route,
                mybody.DepartureTime,
                mybody.ArrivalTime,
                mybody.Status,
                mybody.Capacity
            ]
        );

        // If the insertion was successful, send a success response with the new TrainID
        res.status(201).json({ message: 'Train created successfully' });

    } catch (error) {
        console.error("Error inserting train:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.patch('/train', async (req, res) => {
    try {
        const mybody = await req.body.data;

        // Log the request body to inspect the incoming data
        console.log("Received request to update train data:");
        console.log(mybody);

        // Ensure that all required fields are provided
        const requiredFields = [mybody['TrainID'], mybody['TrainType'], mybody['TrainName'], mybody['Operator'], mybody['Route'], mybody['DepartureTime'], mybody['ArrivalTime'], mybody['Status'], mybody['Capacity']].filter(x => x != undefined);
        if (requiredFields.length < 2) {
            return res.sendStatus(400);
        }

        console.log("Required fields are present, continuing with update...");

        // Check if the train exists in the database
        const checkTrainQuery = `SELECT * FROM trains WHERE TrainID = ?`;
        const trainExists = await db.query(checkTrainQuery, [mybody.TrainID]);

        if (trainExists.length === 0) {
            return res.status(404).json({ error: 'Train not found with the provided TrainID' });
        }

        // Perform the update query
        const updateQuery = `
            UPDATE trains
            SET TrainType = ?, TrainName = ?, Operator = ?, Route = ?, DepartureTime = ?, ArrivalTime = ?, Status = ?, Capacity = ?
            WHERE TrainID = ?`;

        // Debug: log the values being passed into the query
        console.log("Values to be updated:", [
            mybody.TrainType != undefined ? null : mybody.TrainType,
            mybody.TrainName != undefined ? null : mybody.TrainName,
            mybody.Operator != undefined ? null : mybody.Operator,
            mybody.Route != undefined ? null : mybody.Route,
            mybody.DepartureTime != undefined ? null : mybody.DepartureTime,
            mybody.ArrivalTime != undefined ? null : mybody.ArrivalTime,
            mybody.Status != undefined ? null : mybody.Status,
            mybody.Capacity != undefined ? null : mybody.Capacity,
            mybody.TrainID != undefined ? null : mybody.TrainID
        ]);

        const result = await db.query(updateQuery, [
            mybody.TrainType,
            mybody.TrainName,
            mybody.Operator,
            mybody.Route,
            mybody.DepartureTime,
            mybody.ArrivalTime,
            mybody.Status,
            mybody.Capacity,
            mybody.TrainID // Ensure we update the correct record based on TrainID
        ]);

        // Check if the update was successful
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: 'No rows were updated, please check the provided data.' });
        }

        // If the update was successful, send a success response
        res.status(200).json({ message: 'Train updated successfully' });

    } catch (error) {
        console.error("Error updating train:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

app.listen(3000)
