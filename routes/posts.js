const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const router = express.Router();

// Middleware to verify token
router.use((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
});


router.post('/', async (req, res) => {
    try {
        const { content, visibility } = req.body;
        const post = new Post({ content, author: req.user.id, visibility });
        await post.save();
        res.status(201).json({
            message: 'Post created successfully',
            post: {
                id: post._id,
                content: post.content,
                visibility: post.visibility,
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});





router.put('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, visibility } = req.body;
        const post = await Post.findOneAndUpdate(
            { _id: postId, author: req.user.id },
            { content, visibility },
            { new: true }
        );
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.status(200).json({
            message: 'Post updated successfully',
            post: {
                id: post._id,
                content: post.content,
                visibility: post.visibility,
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findOneAndDelete({ _id: postId, author: req.user.id });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.status(200).json({
            message: 'Post deleted successfully',
            post: {
                id: post._id,
                content: post.content,
                visibility: post.visibility,
                createdAt: post.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;


