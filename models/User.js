
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String }, // Add bio field
    profession: { type: String }, // Add profession field
    gender: { type: String, enum: ['male', 'female', 'other'] }, // Add gender field
    // friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // friendRequests: {
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref: 'User',
    //     default: []
    // },
    // followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] ,
    // communities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }], // Add communities field
    // // tokens: [{
    // //     token: {
    // //         type: String,
    // //         required: true
    // //     }
    // // }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
