import * as express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.use(express.json());

router.use('/api/posts', async (req, res) => {
    const posts = await Post.findAll({limit: 10});
    res.send(posts);
});

router.use('/api/post', async (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    
    console.log(req.query);
    const posts = await Post.findOne({where: {id: req.query.id}});
    res.send(posts);
});

router.post('/api/publish', async (req, res) => {
    if (req.body.userID === undefined || req.body.body === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    
    console.log(req.body);
    
    const newPost = Post.build({
        body: req.body.body,
        UserID: req.body.userID
    })
    await newPost.save();

    res.send({postID: newPost.id});
});

export default router;