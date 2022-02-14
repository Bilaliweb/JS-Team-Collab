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

/**
 *  @api  {get} /attachments/:id    Get Attachment by id
 *  @apiName   GetAttachment
 *  @apiGroup  attachments
 *  @apiParam {Number} id Attachment's unique ID.
 *
 *  @apiSuccess {Number} id Attachment's unique ID.
 *  @apiSuccess  {String} title Attachment Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 *       
 *    "/attachments/2"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * [
 * {
 *   "id": 2,
 *   "title": "Links updates required",
 *   "createdAt": "2022-02-03T23:01:03.678Z",
 *   "updatedAt": "2022-02-07T23:02:17.230Z",
 *   "taskId": null
 *  }
 * ]
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * [
 *  {
 *   "id": 6,
 *   "title": "Links updates pls",
 *   "createdAt": "2022-02-07T23:01:26.532Z",
 *   "updatedAt": "2022-02-07T23:01:26.532Z",
 *   "taskId": null
 *  },
 *  {
 *   "id": 2,
 *   "title": "Links updates required",
 *   "createdAt": "2022-02-03T23:01:03.678Z",
 *   "updatedAt": "2022-02-07T23:02:17.230Z",
 *   "taskId": null
 *  },
 *  {
 *   "id": 3,
 *   "title": "Upload a picture",
 *   "createdAt": "2022-02-03T23:01:45.455Z",
 *   "updatedAt": "2022-02-03T23:01:45.455Z",
 *   "taskId": null
 *  }
 * ]
 * 
 *  @apiError IdNotFound The specific id was not found.
 * 
 *  @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *     error: "Sorry, such an id doesn't exist."
 * }
 */

router.get("/:id", async function (req, res) {
     console.log("Fethcing data by id: ");
     const id = req.params.id;
     // let findId = await attachments.findAll({
     //      where: {
     //           id
     //      }
     // });
     // return res.send(findId);

     attachments.findByPk(id)
          .then((attachment) => {
               if (attachment) {
                    console.log(`id ${id} fetched from database ✔`);
                    return res.send(attachment);
               }
               else {
                    return res.status(404).send("Sorry, such an id doesn't exist.").end();
               }
          })
})



///// Create operation

/**
 *  @api  {post} /attachments/create    Create new Attachment
 *  @apiName   CreateAttachment
 *  @apiGroup  attachments
 *  @apiParam {Number} id Attachment's unique ID.
 *
 *  @apiSuccess {Number} id Attachment's unique ID.
 *  @apiSuccess  {String} title Attachment Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 * {   
 *   "title": "Links sent to admin",
 *   "taskId": 36
 * }
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 *  "id": 7,
 *  "title": "Links sent to admin",
 *  "taskId": 36,
 *  "updatedAt": "2022-02-12T17:19:59.977Z",
 *  "createdAt": "2022-02-12T17:19:59.977Z"
 * }
 * 
 */

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { title, taskId } = req.body
     let attachment = await attachments.create({ title, taskId });
     console.log("New attachment created ✔ ");
     return res.send(attachment);
})

///// Update Operation

/**
 *  @api  {put} /attachments/:id    Update existing Attachment
 *  @apiName   CreateAttachment
 *  @apiGroup  attachments
 *  @apiParam {Number} id Attachment's unique ID.
 *
 *  @apiSuccess {Number} id Attachment's unique ID.
 *  @apiSuccess  {String} title Attachment Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 *    
 *       "/attachments/2"
 * 
 *  @apiParamExample Example Body:
 * {   
 *   "id": 2,
 *   "title": "Links updates required",
 *   "taskId": 35
 * }
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 *  "id": 2,
 *  "title": "Links updates required",
 *  "createdAt": "2022-02-03T23:01:03.678Z",
 *  "updatedAt": "2022-02-12T17:12:04.594Z",
 *  "taskId": 35
 * }
 * 
 *  @apiError IdNotFound The specific id was not found.
 * 
 *  @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *     error: "Sorry, such an id doesn't exist."
 * }
 */

router.put('/:id', async function (req, res) {
     const { title, taskId } = req.body;
     const id = req.params.id;
     let update = await attachments.update({ title, taskId }, {
          where: {
               id
          }
     });
     console.log(update);
     if (update[0]) {
          update = await attachments.findByPk(id);
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
 * @api  {delete} /attachments/:id    Deleted existing Attachment
 *  @apiName   DeleteAttachment
 *  @apiGroup  attachments
 *  @apiParam {Number} id Attachment's unique ID.
 *
 *  @apiSuccess {Number} id Attachment's unique ID.
 *  @apiSuccess  {String} title Attachment Title.
 *  @apiSuccess  {Number} taskId  Task Id as Foreign key.
 * 
 *  @apiParamExample Example Body:
 *    
 *       "/attachments/7"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 *   
 *    "Attachment 7 deleted."
 * 
 *  @apiError IdNotFound The specific id was not found.
 * 
 *  @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *     error: "Sorry, such an id doesn't exist."
 * }
 */

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await attachments.destroy({
          where: {
               id
          }
     });
     console.log(del);
     if (!del) {
          return res.status(404).send("Sorry, such an id doesn't exist.");
     }
     console.log("Item deleted ✔");

     return res.send(`Attachment ${id} deleted.`);
},
)

module.exports = router;

