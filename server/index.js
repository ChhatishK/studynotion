const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const cloudinary = require('./config/cloudinaryConfig');
const connectDB = require('./config/database');
const userRoutes = require('./routes/User');
const courseRoutes = require('./routes/Course');
const paymentRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');

require('dotenv').config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)

// connect to cloudinary
cloudinary.cloudinaryConnect();

// connect to  mongoDB
connectDB.connect();

// mount routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);


// default route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Your server is up an running...'
    })
})

// activate the server
app.listen(PORT, () => {
    console.log(`App is running at PORT: ${PORT}`);
})