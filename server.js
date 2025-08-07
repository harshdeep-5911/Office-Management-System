const path = require('path');
const express = require('express');
require('colors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5001;
connectDB();

const app = express();

const cors = require('cors');

