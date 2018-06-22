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
 * Gets all chat's users
 */
router.get('/users', (req, res, next) => {
    ChatRedisController = new RedisController(req.get('chatId'));
    ChatRedisController.getChatUsers()
        .then(data => {
            res.send({success: true, data})
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




/**
 * Saves a given user to a chat users array if it does not present there
 */
router.post('/user', (req, res, next) => {
    ChatRedisController = new RedisController(req.body.chatId);
    ChatRedisController.addUserToChat(req.body)
        .then(data => res.send({success : true, data}))
        .catch(e => res.send({success : false, e}))
});




router.post('/test', (req, res, next) => {
    const ChatRedisController = new RedisController(125);
    ChatRedisController.test()
        .then(data => console.log(data));
});


module.exports = router;