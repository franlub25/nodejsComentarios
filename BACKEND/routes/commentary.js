'use strict'

const express = require('express');
const router = express.Router();
const CommentaryController = require('../controllers/commentary');
const multipart = require('connect-multiparty');
const md_upload = multipart({
    uploadDir: './uploads'
});
const md_test = require('../middlewares/test');

router.post('/test/commentary', md_test.test, CommentaryController.testComment);

router.post('/new/commentary', CommentaryController.newCommentary);
router.post(
    '/upload/file', 
    [md_upload], 
    CommentaryController.newFile
);
router.get('/get/comments', CommentaryController.getComments);
router.get('/get/commentary', CommentaryController.getCommentary);
router.get('/get/file/:fileName', CommentaryController.getfile);
router.delete('/delete/commentary', CommentaryController.deleteCommentary);

module.exports = router;

