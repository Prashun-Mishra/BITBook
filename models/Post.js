const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
},
{
    timestamps:true
}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
