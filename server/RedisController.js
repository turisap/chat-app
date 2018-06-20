const redis = require("redis");
const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

function RedisController (chatId) {

    this.saveMessage = (message) => {
        client.lpushAsync(`chat:${this.chatId}`, JSON.stringify(message))
            .then(data => console.log('SAVE ' + data));
    };

    this.getMessages = async function getMessages() {
        const messages =  client.lrangeAsync(`chat:${this.chatId}`, 0, -1);
        console.log('Controller' + messages);
        return messages;
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