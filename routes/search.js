const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
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

// Search for users by name
router.get('/users', async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find({ name: new RegExp(query, 'i') }, 'name email bio profession gender ');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




// Get profile and posts of a specific user by user ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const posts = await Post.find({ author: req.params.id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json({ user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;










