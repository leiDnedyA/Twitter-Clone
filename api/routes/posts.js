import * as express from 'express';
import { Like, Post } from '../models/models.js';
import auth from '../auth.js';
import { sequelize } from '../db.js';
import { Op } from 'sequelize';

const POST_LIMIT = 5;

const router = express.Router();

router.use(express.json());

router.use('/api/posts', async (req, res) => {
    const queryOptions = { limit: POST_LIMIT, order: [['createdAt', 'DESC']] };
    if (req.query.idLessThan) {
        if (isNaN(req.query.idLessThan) == false) {
            const lastPostID = parseInt(req.query.idLessThan);
            if (lastPostID > Math.pow(10, 100)) {
                res.status(400).send("Bad request.");
                return;
            }
            queryOptions.where = { id: { [Op.lt]: lastPostID } };
        } else {
            res.status(400).send("Bad request.");
            return;
        }
    }
    const posts = await Post.findAll(queryOptions);
    res.send(posts);
});

router.post('/api/like', auth, async (req, res) => {
    if (req.body.PostId === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const likes = await Like.findAll({where: {
        UserId: req.user.id,
        PostId: req.body.PostId
    }});
    if (likes.length <= 0) {
        const like = await Like.build({
            UserId: req.user.id,
            PostId: req.body.PostId
        })
        await like.save();
        res.send({message: "Success!"});
    } else {
        res.status(409).send({message: "Post already liked"})
    }
});

router.delete('/api/like', auth, async (req, res) => {
    if (req.body.PostId === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const likes = await Like.findAll({where: {
        UserId: req.user.id,
        PostId: req.body.PostId
    }});
    if (likes.length != 0) {
        await likes[0].destroy();
        res.send({message: "Success!"});
    } else {
        res.status(409).send({message: "Post not liked."})
    }
});

router.use('/api/post', async (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const post = await Post.findOne({ where: { id: req.query.id } });
    res.send(post);
});

router.post('/api/publish', auth, async (req, res) => {
    if (req.user === undefined || req.body.body === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }

    const newPost = Post.build({
        body: req.body.body,
        UserId: req.user.id
    })
    await newPost.save();

    res.send({ postID: newPost.id });
});

export default router;