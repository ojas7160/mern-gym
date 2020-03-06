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
  Post.find({})
  .then(posts => {
    if(posts && posts.length) {
      // posts.forEach(post => { 
      //   console.log(post)
      //   Like.find({postId: post._id})
      //   .then(likes => {
      //     console.log(likes)
      //     post['likes'] = (likes && likes.length) ? likes : []
      //     completePosts.push(post)
      //   }, err => {
      //     res.json({
      //       message: err
      //     })
      //   })
      //   .catch(error => {
      //     res.json({
      //       message: error
      //     })
      //   })
      // })
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
  Post.find({userId: req.body.userId})
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