'use strict'

const Commentary = require('../models/commentary');
const fs = require('fs');
const path = require('path');

var validator = require('validator');

var controller = {

    // Test y toma de contacto

    testComment: function(req, res){
        console.log("Se ha realizado una petición al metodo testComment");
        return res.status(200).send({
            message: "Este metodo funciona correctamente"
        })
    },

    // Crear un comentario

    newCommentary: function(req, res){

        var params = req.body;

        var commentary = new Commentary();
        commentary.username = params.username;
        commentary.email = params.email;
        commentary.content = params.content;

        var validate_username = validator.isEmpty(commentary.username); 
        var validate_email = validator.isEmail(commentary.email);
        var validate_content = validator.isEmpty(commentary.content);

        var result = ({
            name_isOK: !validate_username + ': ' + params.username,
            email_isOK: validate_email + ': ' + params.email,
            password_isOK: !validate_content + ': ' + params.content
        })

        console.table(result);

        if(!validate_username && validate_email && !validate_content){
            console.log('[OK] - newCommentary - datos validados correctamente');
            commentary.save((err, commentaryStored) => {
                if(err || !commentaryStored){
                    console.log('[ERR] - newCommentary - err || !commentaryStored');
                    return res.status(404).send({
                        code: 404,
                        status: "error",
                        message: "El comentario no se ha podido guardar correctamente"
                    });
                }
                console.log('[OK] - newCommentary - comentario registrado correctamente');
                return res.status(200).send({
                    message: "Comentario guardado correctamente",
                    commentary: commentaryStored,
                    code: 200,
                    status: "success"
                })
            });

        } else {
            console.log('[ERR] - newCommentary - uno o varios de los datos introducidos no son validos');
            return res.status(404).send({
                message: "Los datos recibidos no son validos",
                code: 404,
                status: "error"
            })
        }


    },

    // Añadir la imagen de un comentario

    newFile:function(req, res){
        if(!req.files){
            console.log("[ERR] - new<file - error during upload");
            return res.status(404).send({
                code: 404,
                status: "error",
                message: "La imagen no se ha podido subir correctamente"
            });
        }
        var file_path = req.files.fileToUpload.path;
        
        var commentary_id = req.headers.commentary_id;
        console.log(commentary_id);

        /* *** DESCOMENTAR SOLO LA CORRECTA *** */ 
        var file_split = file_path.split('\\');     //WINDOWS
        //var file_split = file_path.split('/');    //LINUX Y MAC
        
        var file_name = file_split[1];

        console.log(file_path);

        Commentary.findOneAndUpdate({_id: commentary_id}, {file: file_name}, {new: true}, (err, commentaryStored) => {
            if(err || !commentaryStored){
                console.log("[ERR] - fileNew - error during update commentary");
                console.log(req.files.fileToUpload);
                return res.status(500).send({
                    code: 500,
                    status: "error",
                    message: "El comentario no se ha podido actualizar correctamente",
                })
            }
            console.log("[OK] - fileNew - Upload and update success");
            console.log(req.files.fileToUpload);
            return res.status(200).send({
                message: "La imagen se ha subido al servidor satisfactoriamente",
                path: file_path,
                commentary: commentaryStored,
                code: 200,
                status: "success"
            })
        });
    },

    // listar todos los comentarios

    getComments: function(req, res){
        Commentary.find().exec((err, comments) => {
            if(err || !comments){
                console.log("[ERR] - getComments - there are no comments or there was an error during the request to the server");
                return res.status(404).send({
                    message: "La petición no ha arrojado ningun comentario",
                    code: 404,
                    status: "error"
                });
            }
            console.log("[OK] - getComments - comments successfully obtained");
            console.table(comments);
            console.log(comments);
            return res.status(200).send({
                message: "los comentarios se encuentran listados a continuacion",
                code: 200,
                coments: comments,
                status: "success"
            });
        });
    },
    
    // listar un comentario mediante su id

    getCommentary: function(req, res){
        var commentaryId = req.headers.commentary_id;
        Commentary.findById(commentaryId).exec((err, commentary) => {
            if(err || !commentary){
                console.log("[ERR] - getCommentary - The commentary does not exist or there was an error during the request to the server");
                return res.status(404).send({
                    message: "No existe el commentario que has solicitado",
                    code: 404,
                    status: "error"
                });
            }
            console.log("[OK] - getCommentary - the commentary was successfully obtained");
            console.table(commentary);
            console.log(commentary);
            return res.status(200).send({
                message: "Comentario obtenido con exito",
                commentary: commentary,
                code: 200
            });
        });
    },

    // Obtener una imagen

    getfile: function(req, res){
        var fileName = req.params.fileName;
        var pathFile = './uploads/'+fileName;

        fs.exists(pathFile, (exists) => {
            if(exists){
                res.sendFile(path.resolve(pathFile));
            }else{
                console.log("[ERR] - getfile - image does not exist");
                return res.status(404).send({
                    message: "La imagen solicitada no existe"
                });
            }
        });
    },

    // Eliminar un comentario

    deleteCommentary: function (req, res){
        var commentaryId = req.headers.commentary_id;

        Commentary.findOneAndDelete({_id: commentaryId}, (err, commentaryDeleted) => {
            if(err || !commentaryDeleted){
                console.log("[ERR] - deleteCommentary - the commentary does not exist or there was an error during the request");
                return res.status(404).send({
                    message: "El comentario no existe o no se ha podido eliminar correctamente"
                });
            }
            console.log("[OK] - deleteCommentary - the commentary was successfully deleted");
            console.log(commentaryDeleted);
            return res.status(200).send({
                message: "El comentario se ha eliminado correctamente",
                code: 200,
                status: "success",
                commentaryDeleted: commentaryDeleted
            });
        });
    }
}

module.exports = controller;    
