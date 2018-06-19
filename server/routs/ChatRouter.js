const express = require('express');
const router  = express.Router();

router.get('/', () => {
    console.log('ROUTER')
});

router.post('/message', (req, res, next) => {
    res.send('post on message')
});

module.exports = router;