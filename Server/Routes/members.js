const { json } = require('body-parser');
const bodyParser = require('body-parser');
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

/**
 *  @api  {get} /members/:id    Get Member by id
 *  @apiName   GetMembers
 *  @apiGroup  members
 *  @apiParam {Number} id Member's unique ID.
 *
 *  @apiSuccess {Number} id Member's unique ID.
 *  @apiSuccess  {String} name Member name .
 * 
 *  @apiParamExample Example Body:
 *       
 *    "/invoices/15"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * [
 *  {
 *   "id": 15,
 *   "name": "Darab",
 *   "createdAt": "2022-02-11T16:58:29.275Z",
 *   "updatedAt": "2022-02-11T16:58:29.275Z"
 *  }
 * ]
 *  @apiSuccessExample Successful Response:
 * [
 *  {
 *   "id": 15,
 *   "name": "Darab",
 *   "createdAt": "2022-02-11T16:58:29.275Z",
 *   "updatedAt": "2022-02-11T16:58:29.275Z"
 *  },
 *  {
 *   "id": 16,
 *   "name": "Bilal",
 *   "createdAt": "2022-02-12T10:40:07.941Z",
 *   "updatedAt": "2022-02-12T10:40:07.941Z"
 *  }
 * ]
 * 
 */

router.get("/:id", async function (req, res) {
     console.log("Fethcing data by id: ");
     const id = req.params.id;
     // let findId = await members.findAll({
     //      where: {
     //           id
     //      }
     // });
     // return res.send(findId);

     members.findByPk(id)
          .then((member) => {
               if (member) {
                    console.log(`id ${id} fetched from database ✔`);
                    return res.send(member);
               }
               else {
                    return res.status(404).send("Sorry, such an id doesn't exist.").end();
               }
          })
})


///// Create operation

/**
 *  @api  {post} /members/create    Create Member
 *  @apiName   CreateMembers
 *  @apiGroup  members
 *  @apiParam {Number} id Member's unique ID.
 *
 *  @apiSuccess {Number} id Member's unique ID.
 *  @apiSuccess  {String} name Member name .
 * 
 *  @apiParamExample Example Body:
 *       
 *    {
 *       "name": "Ali Ahmad"
 *    }
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 17,
 * "name": "Ali Ahmad",
 * "updatedAt": "2022-02-12T16:41:35.366Z",
 * "createdAt": "2022-02-12T16:41:35.366Z"
 * }
 * 
 */

router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { name } = req.body
     let member = await members.create({ name });
     console.log("New member added ✔ ");
     return res.send(member);
})

// // Update Operation

/**
 *  @api  {put} /members/:id    Update Member by id
 *  @apiName   UpdateMembers
 *  @apiGroup  members
 *  @apiParam {Number} id Member's unique ID.
 *
 *  @apiSuccess {Number} id Member's unique ID.
 *  @apiSuccess  {String} name Member name .
 * 
 *  @apiParamExample Example Body:
 * 
 *         "/members/17"
 * 
 *  @apiParamExample Example Body:
 *       
 *    {
 *       "name": "Ahsan Ali"
 *    }
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 17,
 * "name": "Ahsan Ali",
 * "updatedAt": "2022-02-12T16:41:35.366Z",
 * "createdAt": "2022-02-12T16:44:52.392Z"
 * }
 * 
 */

router.put('/:id', async function (req, res) {
     const { name } = req.body;
     const id = req.params.id;
     let update = await members.update({ name }, {
          where: {
               id
          }
     });
     console.log(update);
     if (update[0]) {
          update = await members.findByPk(id);
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
 *  @api  {delete} /members/:id    Deletes Member by id
 *  @apiName   DeleteMembers
 *  @apiGroup  members
 *  @apiParam {Number} id Member's unique ID.
 *
 *  @apiSuccess {Number} id Member's unique ID.
 *  @apiSuccess  {String} name Member name .
 * 
 *  @apiParamExample Example Body:
 * 
 *         "/members/17"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 *     "Member 17 deleted."
 * 
 */

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     let del = await members.destroy({
          where: {
               id
          }
     });
     console.log(del);
     if (!del) {
          return res.status(404).send("Sorry, such an id doesn't exist.");
     }
     console.log("Member deleted ✔");

     return res.send(`Member ${id} deleted.`);
},
)

// Deleting from front end

// let fetchId = "http://localhost:8080/members/:id";
// let fetchId2 = "http://localhost:8080/members/create";

module.exports = router;
