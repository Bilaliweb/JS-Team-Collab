const express = require('express');
const router = express.Router();
const { attachments } = require('../models');
require('../models/index');
require('../index');

// Read operation: 
router.get('/', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (attachments).findAll();
     return res.send(find);
})


// // Create operation

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { title, taskId } = req.body
     let attachment = await attachments.create({ title, taskId });
     console.log("New task created ✔ ");
     return res.send(attachment);
})

// // Update Operation

router.put('/:id', async function (req, res) {
     const { title, taskId } = req.body;
     const id = req.params.id;
     let update = await attachments.update({ title, taskId }, {
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

     let del = await attachments.destroy({
          where: {
               id
          }
     });
     console.log("Item deleted ✔");

     return res.send("deleted");
},
)

module.exports = router;

