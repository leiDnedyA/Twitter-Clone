import * as express from 'express';
import Post from '../models/Post.js';
import auth from '../auth.js';
import { sequelize } from '../db.js';

const router = express.Router();

router.use(express.json());

router.use('/api/posts', async (req, res) => {
    const posts = await Post.findAll({ limit: 10, order: [['updatedAt', 'DESC']] });
    res.send(posts);
});

router.use('/api/post', async (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }

    const posts = await Post.findOne({ where: { id: req.query.id } });

    res.send(posts);
});

router.post('/api/publish', auth, async (req, res) => {
    if (req.body.userID === undefined || req.body.body === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }

    const newPost = Post.build({
        body: req.body.body,
        userID: req.body.userID
    })
    await newPost.save();

    res.send({ postID: newPost.id });
});

export default router;