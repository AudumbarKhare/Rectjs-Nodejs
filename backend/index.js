const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const roleRoute = require('./routes/role')
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/role',roleRoute);

module.exports = app;