require('dotenv').config();
const express = require('express');
const dbConnect = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const libraryRoutes = require('./routes/libraryRoutes');


const app = express();
app.use(express.json());

dbConnect();

app.use('/api/auth', authRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/libraries', libraryRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
