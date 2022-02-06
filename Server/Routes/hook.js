const express = require('express');
const router = express.Router();
require('../index');

// Fetch all data and displays on specific link in JSON Format.
router.get('/', function (req, res) {
     // res.send('Hello World');

     console.log("web hook triggered...");
     console.log("Triggered ✔");
     res.send(dummyData);

     // res.status(200).end();
})
const dummyData = [
     {
          "name": "Bilal",
          "title": "Senior Python Django Developer",
          "Age": "22"
     },
     {
          "name": "Bilal",
          "title": "Senior Developer",
          "Age": "20"
     },
     {
          "name": "Bilal",
          "title": "Senior JS Developer",
          "Age": "22"
     },
     {
          "name": "Bilal",
          "title": "Senior Developer",
          "Age": "22"
     }
]


module.exports = router;