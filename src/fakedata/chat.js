import uuid from 'uuid';
import chance from 'chance';

const faker = chance();

export const messages = n => {
    const messages = [];
    for (let i = 1; i <= n; i++) {
        messages.push(
            {
                id : uuid(),
                fromMe : Math.floor(Math.random()) > 0.5,
                username : faker.name(),
                date : faker.date().getDate().toString(),
                message : faker.sentence()
            },
        )
    }
    return messages;
}

