import * as express from 'express';
import Post from '../models/Post.js';
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
        userID: req.user.id
    })
    await newPost.save();

    res.send({ postID: newPost.id });
});

export default router;