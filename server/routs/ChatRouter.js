//environment vars
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const RedisController = require('../RedisController');


router.post('/message', (req, res, next) => {
    const ChatRedisController = new RedisController(req.body.chatId);
    ChatRedisController.saveMessage(req.body.message)
        .then(resp => {
            if (process.env.DEBUG) console.log(resp);
            res.send({success : true});
        })
        .catch(e => {
            if (process.env.DEBUG) console.log(e);
            res.send({success : false});
        });
});


router.get('/messages', (req, res, next) => {
    const ChatRedisController = new RedisController(req.get('chatId'));
    ChatRedisController.getMessages()
        .then(messages => {
            if(process.env.DEBUG) console.log(messages);
            res.send({success: true, messages});
        })
        .catch(e => {
            if(process.env.debug) console.log(e);
            res.send({success : false, e})
        })
});

router.get('/users', (req, res, next) => {

});

router.post('/user', (req, res, next) => {

});


module.exports = router;