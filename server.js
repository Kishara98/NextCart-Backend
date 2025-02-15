const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const authenticateJWT = require('./middleware/authenticateJWT.js')

require('dotenv').config();
const app = express();
const url = 'mongodb+srv://admin:admin@nextcartcluster.xmnha.mongodb.net/NextCartCollection?retryWrites=true&w=majority&appName=NextCartCluster';

app.use(express.json());
const PORT = process.env.PORT;

mongoose.connect(url).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
    console.log('Mongo DB Connected');
}).catch(() => {
    console.log('Error connecting MongoDB')
})


app.get('/', (req, res) => {
    res.send('NextCart backend is now running...');
})


app.use('/api/auth', authRoutes);
app.use('/api/products', authenticateJWT, productsRoutes)
app.use('/api/cart', authenticateJWT, cartRoutes)