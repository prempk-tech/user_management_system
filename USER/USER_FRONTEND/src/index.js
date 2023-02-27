const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");

const app = express();

const mongoString = "mongodb://premkumarM:PrEm879@ac-fxmz9li-shard-00-00.ulf7kod.mongodb.net:27017,ac-fxmz9li-shard-00-01.ulf7kod.mongodb.net:27017,ac-fxmz9li-shard-00-02.ulf7kod.mongodb.net:27017/Reguser?ssl=true&replicaSet=atlas-11nipv-shard-0&authSource=admin&retryWrites=true&w=majority";

const RegUser = require('../routes/Register')
const userdetailsmodel = require('../routes/userdetails')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database connected')
})

app.use(express.json());

app.use(cors())

app.use('/api/register', RegUser)
app.use('/api/users', userdetailsmodel)


app.use((req, res, next) => {
    res.status(404).send({ "status": 404, "message": "API URL Not Found", "error": true });
  });

app.listen(3006, () => {
    console.log(`server listen at ${3006}`)
})


