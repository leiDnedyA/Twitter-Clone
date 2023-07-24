import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/api', (req, res) => {
    res.send("Hello mom!");
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
})
