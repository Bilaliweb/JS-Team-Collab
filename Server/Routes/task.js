const express = require('express');
const router = express.Router();
const { tasks } = require('../models');
require('../models/index');
require('../index');

// Read operation: 

router.get('/', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (tasks).findAll();
     console.log("All tasks are fetched ✔");
     return res.send(find);
})
/**
 *  @api  {get} /task/:id    Get task by id
 *  @apiName   GetTasks
 *  @apiGroup  tasks
 *  @apiParam {Number} id Task's unique ID.
 *
 *  @apiSuccess {Number} id Task's unique ID.
 *  @apiSuccess  {String} task_name Task Name of the Task.
 *  @apiSuccess  {String} description  Description of the Task.
 *  @apiSuccess  {Float} actual_hour  Actual hours of the Task.
 *  @apiSuccess  {Float} estimated_hour  Estimated hours of the Task.
 *  @apiSuccess  {Number} id Invoice's ID as Foreign key in tasks.
 * 
 *  @apiParamExample Example Body:
 *       
 *    "/task/35"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * [
 *  {
 *  "id": 35,
 *  "task_name": "Make Table",
 *  "description": "Front end table made by ReactTable7 + Tailwindcss",
 *  "actual_hour": 5,
 *  "estimated_hour": 6,
 *  "createdAt": "2022-02-12T10:24:40.825Z",
 *  "updatedAt": "2022-02-12T10:24:40.825Z",
 *  "invoiceId": 17
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
 * 
 *  @api  {get} /task    Get all tasks
 *  @apiName   GetTasks
 *  @apiGroup  tasks
 * 
 *  @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * [
 * {
 *  "id": 35,
 *  "task_name": "Make Table",
 *  "description": "Front end table made by ReactTable7 + Tailwindcss",
 *  "actual_hour": 5,
 *  "estimated_hour": 6,
 *  "createdAt": "2022-02-12T10:24:40.825Z",
 *  "updatedAt": "2022-02-12T10:24:40.825Z",
 *  "invoiceId": 17
 * },
 * {
 *  "id": 36,
 *  "task_name": "Make API's",
 *  "description": "Make API's and also make .env file for privacy",
 *  "actual_hour": 7,
 *  "estimated_hour": 6.5,
 *  "createdAt": "2022-02-12T10:38:09.435Z",
 *  "updatedAt": "2022-02-12T10:38:09.435Z",
 *  "invoiceId": 18
 * }
 * ]
 * 
 * 
 * 
 */
router.get("/:id", async function (req, res) {
     console.log("Fethcing data by id: ");
     const id = req.params.id;
     // let findId = await tasks.findAll({
     //      where: {
     //           id
     //      }
     // });
     // return res.send(findId);

     tasks.findByPk(id)
          .then((task) => {
               if (task) {
                    console.log(`id ${id} fetched from database ✔`);
                    return res.send(task);
               }
               else {
                    return res.status(404).send("Sorry, such an id doesn't exist.").end();
               }
          })
})


///// Create operation

/**
 *  @api  {post} /task/create    Creates new task
 *  @apiName   CreateTasks
 *  @apiGroup  tasks
 *  @apiParam {Number} id Task's unique ID.
 *
 *  @apiSuccess  {String} task_name Task Name of the Task.
 *  @apiSuccess  {String} description  Description of the Task.
 *  @apiSuccess  {Float} actual_hour  Actual hours of the Task.
 *  @apiSuccess  {Float} estimated_hour  Estimated hours of the Task.
 *  @apiSuccess  {Number} id Invoice's ID as Foreign key in tasks.
 * 
 * @apiParamExample Example Body:
 * {
 *   "task_name": "Make pg_database",
 *   "description": "Use PostgreSql for databases",
 *   "actual_hour": 4,
 *   "estimated_hour": 3,
 *   "invoiceId": 18,
 * }
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 37,
 * "task_name": "Make pg_database",
 * "description": "Use PostgreSql for databases",
 * "actual_hour": 4,
 * "estimated_hour": 3,
 * "invoiceId": 18,
 * "updatedAt": "2022-02-12T14:16:10.444Z",
 * "createdAt": "2022-02-12T14:16:10.444Z"
 *  }
 * 
 */
router.post('/create', async function (req, res) {
     console.log("Creating new entry...");
     const { task_name, description, actual_hour, estimated_hour, invoiceId } = req.body
     let task = await tasks.create({ task_name, description, actual_hour, estimated_hour, invoiceId });
     console.log("New task created ✔ ");
     return res.send(task);
})

///// Update Operation

/**
 *  @api  {put} /task/:id    Update a task by id
 *  @apiName   UpdateTasks
 *  @apiGroup  tasks
 *  @apiParam {Number} id Task's unique ID.
 *
 *  @apiSuccess  {String} task_name Task Name of the Task.
 *  @apiSuccess  {String} description  Description of the Task.
 *  @apiSuccess  {Float} actual_hour  Actual hours of the Task.
 *  @apiSuccess  {Float} estimated_hour  Estimated hours of the Task.
 *  @apiSuccess  {Number} id Invoice's ID as Foreign key in tasks.
 * 
 *  @apiParamExample Example Body:
 *      "/task/37"
 *  @apiParamExample Example Body:
 *  {
 *   "task_name": "Make pg_db",
 *  }
 * 
 *  @apiSuccessExample Successful Response:
 * 
 * HTTP/1.1 200 OK
 * 
 * {
 * "id": 37,
 * "task_name": "Make pg_db",
 * "description": "Use PostgreSql for databases",
 * "actual_hour": 4,
 * "estimated_hour": 3,
 * "createdAt": "2022-02-12T14:16:10.444Z",
 * "updatedAt": "2022-02-12T14:19:46.109Z",
 * "invoiceId": 18
 * }
 *
 *  @apiError IdNotFound The specific id was not found.
 * 
 *  @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *     error: "Sorry, such an id doesn't exist."
 * }
 * 
 */

router.put('/:id', async function (req, res) {
     const { task_name, description, actual_hour, estimated_hour } = req.body;
     const id = req.params.id;
     let update = await tasks.update({ task_name, description, actual_hour, estimated_hour }, {
          where: {
               id
          }
     });
     console.log(update);
     if (update) {
          update = await tasks.findByPk(id);
          console.log("Updated pg_db ✔");
          return res.send(update);
     }
     else {
          return res.status(404).send("Sorry, such an id doesn't exist.")
     }

     // tasks.update({ task_name, description, actual_hour, estimated_hour }, { where: { id } })
     //      .then((task) => {
     //           if (task) {
     //                console.log(task);
     //                console.log("Updated pg_db ✔");
     //                return res.send(task);
     //           }
     //           else {
     //                return res.status(404).send("Sorry, such an id doesn't exist.").end();
     //           }
     //      })


},
)


///// Deleting Operator

/**
 *  @api  {delete} /task/:id    Delete a task by id
 *  @apiName   DeleteTasks
 *  @apiGroup  tasks
 *  @apiParam {Number} id Task's unique ID.
 *
 *  @apiSuccess  {String} task_name Task Name of the Task.
 *  @apiSuccess  {String} description  Description of the Task.
 *  @apiSuccess  {Float} actual_hour  Actual hours of the Task.
 *  @apiSuccess  {Float} estimated_hour  Estimated hours of the Task.
 *  @apiSuccess  {Number} id Invoice's ID as Foreign key in tasks.
 * 
 *  @apiParamExample Example Body:
 *  
 *    "/task/37"
 * 
 *  @apiSuccessExample Successful Response:
 * 
 *       "Task 37 deleted."
 *
 *
 *  @apiError IdNotFound The specific id was not found.
 * 
 *  @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 * {
 *     error: "Sorry, such an id doesn't exist."
 * }
 * 
 */

router.delete('/:id', async function (req, res) {
     let id = req.params.id

     // let del = await tasks.destroy({
     //      where: {
     //           id
     //      }
     // });
     // console.log(del);

     tasks.destroy({ where: { id } })
          .then((task) => {
               if (!task) {
                    console.log(task);
                    return res.status(404).send("Sorry, such an id doesn't exist.");
               }

               console.log(task);
               console.log("Task deleted ✔");

               return res.status(404).send(`Task ${id} deleted.`);
          })
},
)

module.exports = router;

