'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentarySchema = Schema({
    username: String,
    email: String,
    content: String, 
    file: String,
    created_at: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Commentary', CommentarySchema);