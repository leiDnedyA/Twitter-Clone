import * as express from 'express';

const router = express.Router();

router.get('/api/post', (req, res) => {
    console.log(req.query);
    res.send("Hello mom!");
});

router.post('/api/publish', (req, res) => {
    console.log(req.body);
    res.send("published!");
});

export default router;