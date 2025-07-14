const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URI],
    credentials: true
}));

app.use(cookieParser());

app.use('/ping', (req, res) => {
    res.send("pong");
});

app.use('/api/vi/user', userRoutes);


// 404 route config
// app.all('*', (req, res) => {
//     res.status(404).send("OOPS!! 404 page is not found")
// });

app.use(errorMiddleware);

module.exports = app;
