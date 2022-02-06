const express = require('express');
const router = express.Router();
require('../index');

// Post all data to specific link(server) you entered in JSON Format.
router.post('/', function (req, res) {
     console.log('Successful ✔');
     res.send(req.body);
     // req.send(res.body);
})

module.exports = router;