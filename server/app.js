import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: [process.env.FRONTEND_URI],
  credentials: true
}));

app.use(morgan('dev'))

app.use(cookieParser());

// Health check route
app.use('/ping', (req, res) => {
  res.send('pong');
});

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);

// 404 route config (optional)
// app.all('*', (req, res) => {
//   res.status(404).send('OOPS!! 404 page is not found');
// });

// Error middleware (should always be at the end)
app.use(errorMiddleware);

export default app;
