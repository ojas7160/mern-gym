const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  description: {type: String},
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Comment', CommentSchema)