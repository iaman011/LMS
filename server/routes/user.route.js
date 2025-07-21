import express from 'express';
import  isLoggedIn  from '../middlewares/auth.middleware.js';

import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser
} from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js';  //for user profile image upload

const router = express.Router();

router.post('/register',upload.single('avatar'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
// route to forgotPassword
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changePassword);

router.put('/update', isLoggedIn, upload.single('avatar'), updateUser);
//  Upload.single('avatar') -> multer middleware for image updation

export default router;
