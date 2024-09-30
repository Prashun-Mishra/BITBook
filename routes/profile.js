
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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

// Endpoint to fetch user information and posts
router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const posts = await Post.find({ author: req.user.id });
        res.json({ user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Search for users by name
router.get('/users', async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find({ name: new RegExp(query, 'i') }, 'name email bio profession gender hobby');
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
        if (!user) {
            return res.status(404).send('User not found');
        }
        const posts = await Post.find({ author: req.params.id }).populate('likes', 'name');
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profession: user.profession,
                gender: user.gender,
                hobby: user.hobby,
                friends: user.friends,
                followers: user.followers,
            },
            posts: posts.map(post => ({
                id: post._id,
                content: post.content,
                visibility: post.visibility,
                createdAt: post.createdAt,
                likeCount: post.likes.length
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('groups', 'name');
        const posts = await Post.find({ author: req.user.id });
        res.json({ user, posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/update', async (req, res) => {
    try {
        const { bio, gender, profession } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.bio = bio || user.bio;
        user.gender = gender || user.gender;
        user.profession = profession || user.profession;
        await user.save();
        res.status(200).send('Profile updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
