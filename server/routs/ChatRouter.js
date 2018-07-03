//environment vars
require('dotenv').config();

const express = require('express');
const router  = express.Router();

const RedisController = require('../RedisController');

let ChatRedisController;


/**
 * Saves a message to a particular chat
 */
router.post('/message', (req, res, next) => {
    ChatRedisController = new RedisController(req.body.chatId);
    const json = JSON.stringify(req.body.message);
    console.log(json)
    ChatRedisController.saveMessage(json)
        .then(resp => {
            if (process.env.DEBUG) console.log(resp);
            res.send({success : true});
        })
        .catch(e => {
            if (process.env.DEBUG) console.log(e);
            res.send({success : false});
        });
});



/**
 * Gets all chat's messages based on id
 */
router.get('/messages', (req, res, next) => {
    ChatRedisController = new RedisController(req.get('chatId'));
    ChatRedisController.getMessages()
        .then(messages => {
            if(process.env.DEBUG) console.log(messages);
            res.send({success: true, messages});
        })
        .catch(e => {
            if(process.env.DEBUG) console.log(e);
            res.send({success : false, e})
        })
});


/**
 * Saves a user to a particular chat
 */
router.post('/user', (req, res, next) => {
    console.log(req.body.chatId, req.body.user);
    ChatRedisController = new RedisController(req.body.chatId);
    ChatRedisController.addUserToChat(JSON.stringify(req.body.user))
        .then(resp => {
            if (process.env.DEBUG) console.log(resp);
            res.send({success : true, chatId : req.body.chatId})
        })
        .catch(e => {
            if (process.env.DEBUG) console.log(e.response.data);
            res.send({success : false})
        })
});


/**
 * Gets all chat's users
 */
router.get('/users', (req, res, next) => {
    ChatRedisController = new RedisController(req.get('chatId'));
    ChatRedisController.getChatUsers()
        .then(users => {
            res.send({success: true, users})
        })
        .catch(e => res.send(e))
});


// /**
//  * Removes a user from chat's users array
//  */
// router.delete('/user', (req, res, next) => {
//     ChatRedisController = new RedisController(req.body.chatId);
//     ChatRedisController.userQuitsChat(req.body.user)
//         .then()
// });



router.post('/test', (req, res, next) => {
    const ChatRedisController = new RedisController(9);
    ChatRedisController.flushAll()
        .then(res.send('FLUSHED'));
});


module.exports = router;