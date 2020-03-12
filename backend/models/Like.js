const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

module.exports = mongoose.model('Like', likeSchema)