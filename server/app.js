const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}));

app.use(cookieParser());

app.use('/ping', (req, res) => {
    res.send("pong");
});

// 404 route config
app.all('*', (req, res) => {
    res.status(404).send("OOPS!! 404 page is not found")
});

module.exports = app;
