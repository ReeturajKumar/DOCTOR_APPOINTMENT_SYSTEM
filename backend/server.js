const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


//dotenv config
dotenv.config();


//connecting db
connectDB();

//rest object
const app = express()


//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


//routes
app.use('/api/v1/user', require("./route/userRoute"));
app.use('/api/v1/admin', require("./route/adminRoute"));
app.use('/api/v1/doctor', require("./route/doctorRoute"));

// PORT 
const port = process.env.PORT || 8080

//listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`
    );
});