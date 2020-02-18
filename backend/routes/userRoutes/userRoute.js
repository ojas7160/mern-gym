const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authGuard = require('../../middlewares/auth-guard');
const uploadImg = require('../../middlewares/file-upload');

router.post('/login', userController.userLogin);
router.post('/signup', uploadImg, userController.createUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUser/:id', userController.getUser);
router.put('/updateUser/:id', authGuard, uploadImg, userController.updateUser);
router.put('/updatePic/:id', authGuard, uploadImg, userController.updateProfilePicture);
router.post('/changeUserPassword', authGuard, userController.changeUserPassword);


module.exports = router;