const express = require('express');
const router = express.Router();

const likeController = require('../../controllers/likeController');

router.post('/like', likeController.like)
router.post('/dislike', likeController.disLike)

module.exports = router;