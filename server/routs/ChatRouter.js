const express = require('express');
const router  = express.Router();

const RedisController = require('../RedisController');

let ChatRedisController;

router.get('/', () => {
    console.log('ROUTER')
});

router.post('/message', (req, res, next) => {
    ChatRedisController = new RedisController(req.body.chatId);
    ChatRedisController.saveMessage('iiiiiiiiiiii');
    console.log('Router' + ChatRedisController.getMessages());
    res.send('post on message');
});


router.get('/messages', (req, res, next) => {

});

router.get('/users', (req, res, next) => {

});

router.post('/user', (req, res, next) => {

});


module.exports = router;