import express from 'express';
import * as dotenv from 'dotenv';
import postRouter from './api/routes/posts.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(postRouter);

app.get('/api', (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
})
