const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/items');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', itemRoutes);

// ... rest of your app configuration ...