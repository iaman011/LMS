import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';

const isLoggedIn = function (req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError('Unauthenticated, please login', 401));
  }

  try {
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenDetails;
    next();
  } catch (err) {
    return next(new AppError('Invalid or expired token, please login again', 401));
  }
};

export default isLoggedIn;
