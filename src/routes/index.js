const express = require('express');
const app = express();

// Importar todos los routers;
const dogsRouter=require("./dogsRouter");
const temperamentRouter = require('./temperamentRouter');
const dogRouter=require("./dogRouter");

//Rutas 
app.use("/dogs",dogsRouter);
app.use("/temperament",temperamentRouter);
app.use("/dog",dogRouter);

module.exports = app;

