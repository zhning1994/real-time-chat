import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes);
const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))).catch((err) => console.log(err.message));