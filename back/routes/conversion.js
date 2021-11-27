const express = require('express');
const router = express.Router();

const http = require('http');

const options = {
    host: 'https://api.currencylayer.com/live'
}

router.get('/rsd', (req, res, next) => {
    const options = {
        host: 'https://api.currencylayer.com/live?access_key=YOUR_ACCESS_KEY'
    }
    96c7a03cce11e464756d645302fbb324
});

router.get('/eur', (req, res, next) => {

});

router.get('/jpy', (req, res, next) => {

});

module.exports = router;