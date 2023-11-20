
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const appointmentRoutes = require('./routes/appointment')
const cors = require('cors'); 
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
