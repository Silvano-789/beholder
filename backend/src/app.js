const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware');
const morgan = require('morgan');

const symbolsRouter = require('./routers/symbolsRouter');
const settingsRouter = require('./routers/settingsRouter');
const exchangeRouter = require('./routers/exchangeRouter');
const orderRouter = require('./routers/orderRouter')

const authController = require('./controllers/authController');

const app = express();

app.use(morgan('dev'));

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(helmet());

app.use(express.json());

app.post('/login', authController.doLogin); 

app.use('/settings', authMiddleware, settingsRouter);

app.use('/exchange', authMiddleware, exchangeRouter);

app.use('/orders', authMiddleware, orderRouter);

app.use('/symbols', authMiddleware, symbolsRouter);

app.post('/logout', authController.doLogout);

app.use(require('./middlewares/errorMiddleware'));

module.exports = app;