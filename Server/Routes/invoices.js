const express = require('express');
const router = express.Router();
const { invoices } = require('../models');
require('../models/index');
require('../index');

// Read operation: 
router.get('/', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (invoices).findAll();
     return res.send(find);
})


// // Create operation

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { billable_hours, description } = req.body
     let invoice = await invoices.create({ billable_hours, description });
     console.log("New task created ✔ ");
     return res.send(invoice);
})

// // Update Operation

router.put('/:id', async function (req, res) {
     const { billable_hours, description } = req.body;
     const id = req.params.id;
     let update = await invoices.update({ billable_hours, description }, {
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

     let del = await invoices.destroy({
          where: {
               id
          }
     });
     console.log("Item deleted ✔");

     return res.send("deleted");
},
)

module.exports = router;
