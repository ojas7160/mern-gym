const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postsController');
const fileUpload = require('../../middlewares/file-upload');

router.get('/getAllPosts', postController.getAllPosts);
router.post('/', fileUpload, postController.createPost);
router.get('/getMyPosts', postController.getMyPosts);

module.exports = router;