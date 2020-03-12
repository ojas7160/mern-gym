const Like = require('../models/Like'); 
const Post = require('../models/Post'); 
const User = require('../models/User'); 

exports.like = (req, res, next) => {
  let canLike = true;
  Like.findOne({$and: [{userId: req.body.userId}, {postId: req.body.postId}] })
  .then(like => {
    if(like && Object.keys(like).length) {
      canLike = false;
      Like.deleteOne({_id: like._id})
      .then(deletedLike => {
        
      })
    }
    if(canLike) {
      const like = new Like({postId: req.body.postId, userId: req.body.userId})
    
      like.save()
      .then(like => {
        res.json({
          success: true,
          message: 'liked'
        })
      }, err => {
        res.json({
          success: false,
          error: err
        })
      })
      .catch(error => {
        res.json({
          success: false,
          error: error
        })
      })
    } else {
      res.json({
        success: true,
        message: 'like removed'
      })
    }
  })
}