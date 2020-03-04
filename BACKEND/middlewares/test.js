
exports.test = function(req, res, next){
    var body = req.body;
    if(body.key){
        console.log("Middleware[OK] - test - Se han cumplido todos los requisitos que se especificaban en el middleware");
        next();  
    }else{
        console.log("Middleware[ERR] - test - No se han cumplido los requisitos necesarios para atravesar el middleware");
        return res.status(404).send({
            code: 404,
            status: "error",
            message: "no se ha recivido el parametro 'key' en la petición al servidor"
        })
    }
}