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

/**
 *  @api  {get} /invoices/:id    Get Invoice by id
 *  @apiName   GetInvoices
 *  @apiGroup  invoices
 *  @apiParam {Number} id Invoice's unique ID.
 *
 *  @apiSuccess {Number} id Invoice's unique ID.
 *  @apiSuccess  {String} billable_hours Billable_hours mentioned in invoice.
 *  @apiSuccess  {String} description  Invoice Description.
 * 
 *  @apiParamExample Example Body:
 *       
 *    "/invoices/17"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * [
 *  {
 *   "id": 17,
 *   "billable_hours": 4,
 *   "description": "Paid $50 per hour",
 *   "createdAt": "2022-02-12T10:23:49.682Z",
 *   "updatedAt": "2022-02-12T10:23:49.682Z"
 *  }
 * ]
 * 
 * 
 *  @api  {get} /invoices   Get all invoices
 *  @apiName   GetInvoices
 *  @apiGroup  invoices
 * 
 *  @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "id": 17,
 *   "billable_hours": 4,
 *   "description": "Paid $50 per hour",
 *   "createdAt": "2022-02-12T10:23:49.682Z",
 *   "updatedAt": "2022-02-12T10:23:49.682Z"
 *  },
 *  {
 *   "id": 18,
 *   "billable_hours": 5,
 *   "description": "Paid $50 per hour",
 *   "createdAt": "2022-02-12T10:34:53.466Z",
 *   "updatedAt": "2022-02-12T10:34:53.466Z"
 *  }
 * ]
 * 
 * 
 */

router.get("/:id", async function (req, res) {
     console.log("Fethcing data by id: ");
     const id = req.params.id;
     // let findId = await invoices.findAll({
     //      where: {
     //           id
     //      }
     // });
     // return res.send(findId);

     invoices.findByPk(id)
          .then((invoice) => {
               if (invoice) {
                    console.log(`id ${id} fetched from database ✔`);
                    return res.send(invoice);
               }
               else {
                    return res.status(404).send("Sorry, such an id doesn't exist.").end();
               }
          })
})


///// Create operation

/**
 *  @api  {post} /invoices/create    Creates new Invoice
 *  @apiName   CreateInvoices
 *  @apiGroup  invoices
 *  @apiParam {Number} id Invoice's unique ID.
 *
 *  @apiSuccess  {String} billable_hours Billable_hours mentioned in invoice.
 *  @apiSuccess  {String} description  Invoice Description.
 * 
 * @apiParamExample Example Body:
 * {
 *  "billable_hours": 2,
 *  "description": "Paid $20 for whole 2 hours."
 *  }
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 19,
 * "billable_hours": 2,
 * "description": "Paid $20 for whole 2 hours.",
 * "updatedAt": "2022-02-12T16:21:16.527Z",
 * "createdAt": "2022-02-12T16:21:16.527Z"
 * }
 * 
 * 
 */

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { billable_hours, description } = req.body
     let invoice = await invoices.create({ billable_hours, description });
     console.log("New invoice created ✔ ");
     return res.send(invoice);
})

///// Update Operation

/**
 *  @api  {put} /invoices/:id    Updates existing Invoice
 *  @apiName   UpdateInvoices
 *  @apiGroup  invoices
 *  @apiParam {Number} id Invoice's unique ID.
 *
 *  @apiSuccess  {String} billable_hours Billable_hours mentioned in invoice.
 *  @apiSuccess  {String} description  Invoice Description.
 * 
 * @apiParamExample Example Body:
 * 
 *       "/invoices/19"
 * 
 * @apiParamExample Example Body:
 * {
 *  "billable_hours": 4,
 *  "description": "Paid Rs.20,000 for whole 4 hours."
 *  }
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 19,
 * "billable_hours": 4,
 * "description": "Paid Rs.20,000 for whole 4 hours.",
 * "createdAt": "2022-02-12T16:21:16.527Z",
 * "updatedAt": "2022-02-12T16:25:30.018Z"
 * }
 * 
 */

router.put('/:id', async function (req, res) {
     const { billable_hours, description } = req.body;
     const id = req.params.id;
     let update = await invoices.update({ billable_hours, description }, {
          where: {
               id
          }
     });
     console.log(update);
     if (update[0]) {
          update = await invoices.findByPk(id);
          console.log("Updated pg_db ✔");
          return res.send(update);
     }
     else {
          return res.status(404).send("Sorry, such an id doesn't exist.");

     }

},
)

///// Deleting Operator

/**
 *  @api  {delete} /invoices/:id    Deletes existing Invoice
 *  @apiName   DeleteInvoices
 *  @apiGroup  invoices
 *  @apiParam {Number} id Invoice's unique ID.
 *
 *  @apiSuccess  {String} billable_hours Billable_hours mentioned in invoice.
 *  @apiSuccess  {String} description  Invoice Description.
 * 
 * @apiParamExample Example Body:
 * 
 *     "/invoices/16"
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * 
 *     "Invoice 16 deleted."
 * 
 */

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await invoices.destroy({
          where: {
               id
          }
     });
     console.log(del);
     if (!del) {
          return res.status(404).send("Sorry, such an id doesn't exist.");

     }
     console.log("Invoice deleted ✔");
     return res.send(`Invoice ${id} deleted.`);


},
)

module.exports = router;
