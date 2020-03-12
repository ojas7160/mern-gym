const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {
  const comment = new Comment(req.body)

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
