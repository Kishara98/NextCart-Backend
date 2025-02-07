const express = require('express');
const authRoutes = require('./routes/authRoutes.js');
require('dotenv').config();
const app = express();

app.use(express.json());
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('NextCart backend is now running...');
})


app.use('/api/auth', authRoutes);