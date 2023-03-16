const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const apiRoutes = require('./routes/api-routes');
const loginRoutes = require('./routes/login-routes');


app.use(express.json());
app.use(cors());
app.use('/api', apiRoutes);
app.use('/loginapi', loginRoutes);

//  DB connection
try{
    db_url = process.env.DB_URL || 'mongodb://localhost:27017/todo';
    mongoose.connect(db_url)
    mongoose.connection.on('connected', () => {
        console.log('Mongoose is connected!!!!');
    });
}catch(e){
    console.log('Error connecting to Mongoose DB');
}





const port = process.env.PORT || 8000
app.listen(port, () => {
    try {
        console.log('listening on port ' + port);
    }
    catch (e) {
        console.log(e)
    }
})