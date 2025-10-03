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

const authorizedRoles = (...roles) => (req,res,next) => {
  const currentRole = req.user.role;
  if(!roles.includes(currentRole)){
     return next(new AppError('You do not have permission to access this route', 403));
  }
  next();
}

const authorizedSubscriber= async (req,res,next) => {
  const subscriptionStatus = req.user.subscription.status;
  const currentRole = req.user.role;

  if (currentRole !== 'ADMIN' && subscriptionStatus !== 'active'){
       return next(new AppError('Please Subscribe to access this route', 403));
  }
  next();
};

export default isLoggedIn;
export { authorizedRoles, authorizedSubscriber };
