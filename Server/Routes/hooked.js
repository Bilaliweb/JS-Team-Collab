const express = require('express');
const router = express.Router();
const { members } = require('../models');
require('../index');

// Post all data to specific link(server) you entered in JSON Format.
router.post('/', async function (req, res) {
     console.log('Successful ✔');
     const { name } = req.body
     let member = await members.create({ name });
     console.log("New member added ✔ ");
     return res.send(member);
})

module.exports = router;

