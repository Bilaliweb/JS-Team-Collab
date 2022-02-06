const express = require('express');
const router = express.Router();
const { members } = require('../models');
require('../models/index');
require('../index');

// Read operation: 
router.get('/', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (members).findAll();
     return res.send(find);
})


// // Create operation

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { name, task_id } = req.body
     let member = await members.create({ name, task_id });
     console.log("New task created ✔ ");
     return res.send(member);
})

// // Update Operation

router.put('/:id', async function (req, res) {
     const { name, task_id } = req.body;
     const id = req.params.id;
     let update = await members.update({ name, task_id }, {
          where: {
               id
          }
     });
     console.log("Updated pg_db ✔");

     return res.send(update);
},
)


// // Deleting Operator

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await members.destroy({
          where: {
               id
          }
     });
     console.log("Item deleted ✔");

     return res.send("deleted");
},
)

module.exports = router;
