const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  imagePath: {type: String},
  description: {type: String},
  addedOn: {type: Date},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: { createdAt: 'createdAt' } })

module.exports = mongoose.model('Post', postSchema)