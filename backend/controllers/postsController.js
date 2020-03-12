const Post = require('../models/Post');
const Like = require('../models/Like');


exports.createPost = (req, res, next) => {
  console.log(req)
  req.body.addedOn = new Date();
  let postReqBody = {title: req.body.title, description: req.body.description, userId: req.body.userId}
  console.log(postReqBody);
  const url = req.protocol + '://' + req.get('host');
  if(req.file) {
    postReqBody['imagePath'] = url + '/images/postImages/' + req.file.filename
  }
  else {
    postReqBody['imagePath'] = req.body.image
  }
  const post = new Post(postReqBody)
  post.save().then(post => {
    if(post) {
      res.json({
        message: 'Success',
        post: post
      })
    } else {
      res.json({
        message: 'Error'        
      })
    }
  }, err => {
    res.json({
      message: err
    })
  })
}

exports.getAllPosts = (req, res, next) => {
  Post.aggregate( [{ $lookup: {
    from: 'comments', localField: '_id', foreignField: 'postId', as: 'comments'
  } }, { $lookup: {from: 'likes', localField: '_id', foreignField: 'postId', as: 'likes'} } ])
  .then(posts => {
    if(posts && posts.length) {
      res.json({
        message: 'All posts',
        posts: posts
      })
    } else {
      res.json({
        message: 'No posts',
        posts: []
      })
    }
  }, err => {
    res.json({
      message: err
    })
  })
  .catch(error => {
    res.json({
      message: error
    })
  })
}

exports.getMyPosts = (req, res, next) => {
  Post.aggregate( [
    { $match: { userId: req.body.userId } },
    { $lookup: { from: 'likes', localField: '_id', foreignField: 'postId', as: 'likes' } },
    { $lookup: { from: 'comments', localField: '_id', foreignField: 'postId', as: 'comments' } }  
  ] )
  .then(posts => {
    if(posts && posts.length) {
      res.json({
        message: 'All posts',
        posts: posts
      })
    } else {
      res.json({
        message: 'No posts',
        posts: []
      })
    }
  }, err => {
    res.json({
      message: err
    })
  })
}