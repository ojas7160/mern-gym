const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
  const newComment = {userId: req.body.userId, postId: req.body.postId, description: req.body.description}
  const comment = new Comment(newComment)

  comment.save()
  .then(comment => {
    res.json({
      comment: comment,
      success: true
    })
  }, err => {
    res.json({
      error: err,
      success: false
    })
  })
  .catch(err => {
    res.json({
      error: err,
      success: false
    })
  })
}
