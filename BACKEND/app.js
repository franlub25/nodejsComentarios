'use strict'

//CARGA DE LIBRERIAS
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');

//EJECUCIÓN DEL SERVIDOR DE EXPRESS
const app = express();

//RUTAS
const commentary_routes = require('./routes/commentary');

//MIDDLEWARES
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(morgan('dev'));

//CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, commentary_id, applicatio/json');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//REDEFINICIÓN DE RUTAS
app.use('/ApiRestMEAN', commentary_routes);

//EXPORTADO DEL MODULO
module.exports = app;

