const path = require('path');
const express = require('express');
require('colors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// ===== CORS CONFIGURATION =====

// Read allowed origins from .env and split into array
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Handle CORS dynamically
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin.trim())) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin} is not allowed`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Preflight requests
app.options('*', cors(corsOptions));

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ===== ROUTES =====
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/contact', require('./routes/helpRoutes')); 
app.use('/api/grievances', require('./routes/grievanceRoutes'));

// ===== STATIC FILES (for frontend in production) =====
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

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== START SERVER =====
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
