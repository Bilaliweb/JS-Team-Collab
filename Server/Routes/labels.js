const express = require('express');
const router = express.Router();
const { Labels } = require('../models');
require('../models/index');
require('../index');

// Read Operation

router.get('/', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (Labels).findAll();
     return res.send(find);
})


// Create labels...
router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { title, taskId } = req.body
     let label = await Labels.create({ title, taskId });
     console.log("New label added ✔ ");
     return res.send(label);
})

// Update Operation

router.put('/:id', async function (req, res) {
     const { title, taskId } = req.body;
     const id = req.params.id;
     let update = await Labels.update({ title, taskId }, {
          where: {
               id
          }
     });
     console.log("Updated pg_db ✔");

     return res.send(update);
},
)

// Delete Operation
router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await Labels.destroy({
          where: {
               id
          }
     });
     console.log("Item deleted ✔");

     return res.send("deleted");
},
)

module.exports = router;

