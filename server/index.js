const connectToMongo= require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port =process.env.PORT ||5000
connectToMongo();

app.use(cors());
app.use(express.json());

//Avialable Routes
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
    console.log(`App is running on the port ${port}`)
  })