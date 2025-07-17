import express from 'express';
import  isLoggedIn  from '../middlewares/auth.middleware.js';

import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
// route to forgotPassword
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);


export default router;
