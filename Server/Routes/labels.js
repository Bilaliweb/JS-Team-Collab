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

/**
 *  @api  {get} /labels/:id    Get Label by id
 *  @apiName   GetLabel
 *  @apiGroup  Labels
 *  @apiParam {Number} id Label's unique ID.
 *
 *  @apiSuccess {Number} id Label's unique ID.
 *  @apiSuccess  {String} title Label Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 *       
 *    "/labels/8"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * [
 *  {
 *   "id": 8,
 *   "title": "Front End ",
 *   "createdAt": "2022-02-12T10:28:56.188Z",
 *   "updatedAt": "2022-02-12T10:28:56.188Z",
 *   "taskId": 35
 *  }
 * ]
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * [
 *  {
 *   "id": 8,
 *   "title": "Front End ",
 *   "createdAt": "2022-02-12T10:28:56.188Z",
 *   "updatedAt": "2022-02-12T10:28:56.188Z",
 *   "taskId": 35
 *  },
 *  {
 *   "id": 9,
 *   "title": "Back end",
 *   "createdAt": "2022-02-12T10:39:14.672Z",
 *   "updatedAt": "2022-02-12T10:39:14.672Z",
 *   "taskId": 36
 *  }
 * ]
 * 
 */

router.get("/:id", async function (req, res) {
     console.log("Fethcing data by id: ");
     const id = req.params.id;
     // let findId = await Labels.findAll({
     //      where: {
     //           id
     //      }
     // });
     // return res.send(findId);

     Labels.findByPk(id)
          .then((label) => {
               if (label) {
                    console.log(`id ${id} fetched from database ✔`);
                    return res.send(label);
               }
               else {
                    return res.status(404).send("Sorry, such an id doesn't exist.").end();
               }
          })
})


// Create labels...

/**
 *  @api  {post} /labels/create    Create new label
 *  @apiName   CreateLabel
 *  @apiGroup  Labels
 *  @apiParam {Number} id Label's unique ID.
 *
 *  @apiSuccess {Number} id Label's unique ID.
 *  @apiSuccess  {String} title Label Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 *       
 *  {
 *   "title": "Database",
 *   "taskId": 36
 *  }
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 10,
 * "title": "Database",
 * "taskId": 36,
 * "updatedAt": "2022-02-12T16:59:20.656Z",
 * "createdAt": "2022-02-12T16:59:20.656Z"
 * }
 * 
 */

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { title, taskId } = req.body
     let label = await Labels.create({ title, taskId });
     console.log("New label added ✔ ");
     return res.send(label);
})

// Update Operation

/**
 *  @api  {put} /labels/:id    Updates Existing label
 *  @apiName   UpdateLabel
 *  @apiGroup  Labels
 *  @apiParam {Number} id Label's unique ID.
 *
 *  @apiSuccess {Number} id Label's unique ID.
 *  @apiSuccess  {String} title Label Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 * 
 *        "/labels/10"  
 * 
 *  @apiParamExample Example Body:
 *       
 *  {
 *   "title": "PostgreSql",
 *   "taskId": 36
 *  }
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 10,
 * "title": "PostgreSql",
 * "taskId": 36,
 * "updatedAt": "2022-02-12T16:59:20.656Z",
 * "createdAt": "2022-02-12T17:03:29.847Z"
 * }
 * 
 * 
 */

router.put('/:id', async function (req, res) {
     const { title, taskId } = req.body;
     const id = req.params.id;
     let update = await Labels.update({ title, taskId }, {
          where: {
               id
          }
     });
     console.log(update);
     if (update[0]) {
          update = await Labels.findByPk(id);
          console.log("Updated pg_db ✔");
          return res.send(update);
     }
     else {
          return res.status(404).send("Sorry, such an id doesn't exist.")
     }
},
)

// Delete Operation

/**
 *  @api  {delete} /labels/:id    Deletes Existing label
 *  @apiName   DeleteLabel
 *  @apiGroup  Labels
 *  @apiParam {Number} id Label's unique ID.
 *
 *  @apiSuccess {Number} id Label's unique ID.
 *  @apiSuccess  {String} title Label Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 * 
 *        "/labels/10"  
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * "Label 10 deleted."
 * 
 */

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await Labels.destroy({
          where: {
               id
          }
     });
     console.log(del);
     if (!del) {
          return res.status(404).send("Sorry, such an id doesn't exist.");
     }
     console.log("Label deleted ✔");

     return res.send(`Label ${id} deleted.`);
},
)

module.exports = router;

