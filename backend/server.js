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

// Read allowed origins from .env and split them into an array
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow non-browser tools (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin.trim())) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin} is not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use('/api/contact', require('./routes/helpRoutes')); 
app.use('/api/grievances', require('./routes/grievanceRoutes'));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
