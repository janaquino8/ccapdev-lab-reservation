import express from 'express';
import dotenv from 'dotenv';

import authRouter from './routes/auth.routes';
import laboratoryRouter from './routes/laboratory.routes';
import reservationRouter from './routes/reservation.routes';
import slotRouter from './routes/slot.routes';
import userRouter from './routes/user.routes';
import connect_db from './config/db.ts'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000; 
const host = process.env.DB_HOST || 'localhost:';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect_db();

app.use('/auth', authRouter);
app.use('/laboratories', laboratoryRouter);
app.use('/reservations', reservationRouter);
app.use('/slots', slotRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`api is live on http://${host}:${port}`);
});