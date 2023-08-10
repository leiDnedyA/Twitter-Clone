import express from 'express';
import * as dotenv from 'dotenv';
import postRouter from './api/routes/posts.js';
import userRouter from './api/routes/users.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(postRouter);
app.use(userRouter);

app.get('/api', (req, res) => {
    res.send("nothing to see here...");
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
})
