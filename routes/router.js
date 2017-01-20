const pkg = require('../package');
const config = require('../config');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log(config.messages.onRequest, req.method, req.url, req.headers['user-agent']);
    next();
});

router.get(config.basePath, (req, res) => {
    res.json({
        message: config.messages.onIndex,
        version: pkg.version
    });
});

// Include all other routers
require('./plans')(router);

module.exports = router;