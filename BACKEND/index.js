'use strict'
//CONEXIÓN CON LA BASE DE DATOS
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3999;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ApiRestMEAN', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => {
        console.clear();
        console.log("Conexión establecida con la base de datos");
        app.listen(port, () => {
            console.log("c El servidor se ha iniciado correctamente y esta escuchando en el puerto", port);
        })
    })
    .catch((error) => {
        console.clear();
        console.log(error);
    });


