
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const  profileRoutes = require('./routes/profile');
const searchRoutes = require('./routes/search'); 

const bodyParser = require('body-parser');
app = express();

// Middleware
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bitbook-mini', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Routes
// app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes); 

app.use('/auth', authRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
