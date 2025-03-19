const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
