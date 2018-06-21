const redis = require("redis");
const client = redis.createClient();
const bluebird = require('bluebird');
const winston = require('winston');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

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


    this.test = () => {
        client.setAsync('key', 'value!', 'EX', 10)
            .then(data => console.log('TEST ' + data));
        client.getAsync('key')
            .then(data => console.log(data));
    };

    this.init = () => {
        this.chatId = chatId;
    };

    this.init();
}

module.exports = RedisController;