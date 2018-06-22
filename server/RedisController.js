const redis = require("redis");
const client = redis.createClient();
const bluebird = require('bluebird');
const winston = require('winston');


// promisifying Redis client
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// loger set up
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});



function RedisController (chatId) {



    /**
     * Saves a messages to Redis based on chat ID
     * @param message
     * @returns {Promise<*>}
     */
    this.saveMessage = async function(message) {
        try {
            return await client.lpushAsync(`chat:${this.chatId}`, JSON.stringify(message));
        } catch (e) {
            if (process.env.DEBUG) console.log(e);
            logger.log({
                level : 'info',
                message : e
            })
        }
    };





    /**
     * Gets all messages for a given chat
     * @returns {Promise<*>}
     */
    this.getMessages = async function() {
        try {
            return await client.lrangeAsync(`chat:${this.chatId}`, 0, -1);
        } catch (e) {
            if (process.env.DEBUG) console.log(e);
            logger.log({
                level : 'info',
                message : e
            })
        }
    };




    /**
     * Adds a user to a chat based on chatId if it does not exist
     * and rejects request if it does
     * @param chatId
     * @param user
     * @returns {Promise<boolean>}
     */
    this.addUserToChat = async function({chatId, user}) {
        try {
            const exists = await userAlreadyIsInChat(chatId, user);
            if (exists) return false;

            await client.lpushAsync(`chat:${chatId}:users`, user);
            // this.test(chatId)
            //     .then(data => console.log(data))
            return true;
        } catch(e) {
            if (process.env.DEBUG) console.log(e);
            logger.log({
                level : 'info',
                message : e
            })
        }
    };


    /**
     * @returns {Promise<*>}
     */
    this.getChatUsers = async function() {
        try {
            return await client.lrangeAsync(`chat:${this.chatId}:users`, 0, -1)
        } catch (e) {
            if (process.env.DEBUG) console.log(e);
        }
    };



    /**
     * Controller initializer
     */
    this.init = () => {
        this.chatId = chatId;
    };



    /**
     * Checks whether or not a given user already is in database
     * @param chatId
     * @param user
     * @returns {Promise<*>}
     */
    async function userAlreadyIsInChat(chatId, user) {
        //const chatUsers = await client.lpushAsync(`chat:${chatId}:users`, user)
        const chatUsers = await client.lrangeAsync(`chat:${chatId}:users`, 0, -1);
        if (!chatUsers.length) return false;
        return chatUsers.includes(user);
    }


    this.init();
}



module.exports = RedisController;