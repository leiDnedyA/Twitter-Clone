import * as express from 'express';
import { Like, Post, Comment, User } from '../models/models.js';
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
    const mappedPosts = await Promise.all(posts.map(async (post) => {
        const allLikes = await Like.findAll({ where: { PostId: post.id } });
        post.dataValues.isLiked = false;
        post.dataValues.likeCount = allLikes.length;

        let comments = [];
        if (post !== null) {
            comments = await Comment.findAll({ where: { PostId: post.id } });
            comments = await Promise.all(comments.map(async (comment) => {
                const user = await User.findOne({ where: { id: comment.UserId } });
                comment.dataValues.userName = user.name;
                return comment;
            }));
        }
        post.dataValues.comments = comments;
        return post;
    }));
    res.send(mappedPosts);
});

router.use('/api/authed-posts', auth, async (req, res) => {
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
    const mappedPosts = await Promise.all(posts.map(async (post) => {
        const userLike = await Like.findOne({
            where: {
                PostId: post.dataValues.id,
                UserId: req.user.id
            }
        });
        const allLikes = await Like.findAll({ where: { PostId: post.id } });
        post.dataValues.isLiked = userLike !== null;
        post.dataValues.likeCount = allLikes.length;

        let comments = [];
        if (post !== null) {
            comments = await Comment.findAll({
                where: { PostId: post.id },
                order: [['id', 'DESC']]
            });
            comments = await Promise.all(comments.map(async comment => {
                const user = await User.findOne({ where: { id: comment.UserId } });
                comment.dataValues.userName = user.name;
                return comment;
            }))
        }
        post.dataValues.comments = comments;
        return post;
    }));
    res.send(mappedPosts);
});

router.post('/api/comment', auth, async (req, res) => {
    if (req.body.PostId === undefined || req.body.body === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const comment = await Comment.build({
        UserId: req.user.id,
        PostId: req.body.PostId,
        body: req.body.body
    })
    await comment.save();
    res.status(200).send({ "Message": "success" });
})

router.post('/api/like', auth, async (req, res) => {
    if (req.body.PostId === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const likes = await Like.findAll({
        where: {
            UserId: req.user.id,
            PostId: req.body.PostId
        }
    });
    if (likes.length <= 0) {
        const like = await Like.build({
            UserId: req.user.id,
            PostId: req.body.PostId
        })
        await like.save();
        res.send({ message: "Success!" });
    } else {
        res.status(409).send({ message: "Post already liked" })
    }
});

router.delete('/api/like', auth, async (req, res) => {
    if (req.body.PostId === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const likes = await Like.findAll({
        where: {
            UserId: req.user.id,
            PostId: req.body.PostId
        }
    });
    if (likes.length != 0) {
        await likes[0].destroy();
        res.send({ message: "Success!" });
    } else {
        res.status(409).send({ message: "Post not liked." })
    }
});

router.use('/api/post', async (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send("Bad request, missing fields");
        return;
    }
    const post = await Post.findOne({ where: { id: req.query.id } });
    post.dataValues.likeCount = (await Like.findAll({ where: { PostId: post.id } })).length;
    let comments = [];
    if (post !== null) {
        comments = await Comment.findAll({ where: { PostId: post.id } });
        comments = Promise.all(comments.map(async (comment) => {
            const user = await User.findOne({ where: { id: comment.UserId } });
            comment.userName = user.name;
            return comment;
        }));
    }
    post.dataValues.comments = comments;
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