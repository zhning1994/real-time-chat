import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))).catch((err) => console.log(err.message));