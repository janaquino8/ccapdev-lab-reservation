import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.routes.js';
import laboratoryRouter from './routes/laboratory.routes.js';
import reservationRouter from './routes/reservation.routes.js';
import slotRouter from './routes/slot.routes.js';
import userRouter from './routes/user.routes.js';
import connect_db from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; 
const host = process.env.DB_HOST || 'localhost:';

const frontendURL = 'http://localhost:5173';

app.use(cors({
    origin: frontendURL, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit : '10mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connect_db();

app.use('/auth', authRouter);
app.use('/laboratories', laboratoryRouter);
app.use('/reservations', reservationRouter);
app.use('/slots', slotRouter);
app.use('/users', userRouter);

app.use(express.static(path.join(__dirname, '/../client/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/index.html'));
});

app.listen(port, () => {
    console.log(`api is live on http://${host}:${port}`);
});