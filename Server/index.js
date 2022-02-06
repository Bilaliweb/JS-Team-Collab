var express = require('express');
const { Sequelize } = require('sequelize');
const { tasks, members, labels, invoices, attachments } = require('./models');
const bodyParser = require("body-parser");
const sequelize = new Sequelize('Bilal', 'postgres', 'PostgreSql14', {
     host: 'localhost',
     dialect: 'postgres'
});
try {
     sequelize.authenticate();
     console.log('Connection has been established successfully.');
     console.log(`You can see output at "http://localhost:8080"`);
     console.log(`All set with database(PostgreSql)...`);
} catch (error) {
     console.error('Unable to connect to the database:', error);
}

var app = express();
app.use(express.json())

// We used Thunder Client for API Testing...

app.get('/', function (req, res) {
     res.send('Hello World');

})

// app.get('/About', function (req, res) {
//      res.send("This page does't exist...");
// })


// Read operation: 

app.get('/api', async function (req, res) {
     console.log("Fethcing all data from pg_db...");
     let find = await (tasks).findAll();
     return res.send(find);
})


// Create operation

app.post('/api/task/create', async function (req, res) {
     console.log("Creating new entry...");
     const { task_name, description, actual_hour, estimated_hour, invoiceId } = req.body
     let task = await tasks.create({ task_name, description, actual_hour, estimated_hour, invoiceId });
     console.log("New task created ✔ ");
     return res.send(task);
})

app.post('/api/members/create', async function (req, res) {
     console.log("Creating new entry...");
     const { name, task_id } = req.body
     let member = await members.create({ name, task_id });
     console.log("New member added ✔ ");
     return res.send(member);
})

app.post('/api/labels/create', async function (req, res) {
     console.log("Creating new entry...");
     const { title, task_id } = req.body
     const label = await labels.create({ title, task_id });
     console.log("New label added ✔ ");
     return res.send(label);
})

app.post('/api/attachments/create', async function (req, res) {
     console.log("Creating new entry...");
     const { title } = req.body
     let attachment = await attachments.create({ title });
     console.log("New attachment added ✔ ");
     return res.send(attachment);
})

app.post('/api/invoices/create', async function (req, res) {
     console.log("Creating new entry...");
     const { billable_hours, description } = req.body
     let invoice = await invoices.create({ billable_hours, description });
     console.log("New invoice added ✔ ");
     return res.send(invoice);
})


// Update Operation

app.put('/api/:id', async function (req, res) {
     const { task_name } = req.body;
     const id = req.params.id;
     let update = await tasks.update({ task_name }, {
          where: {
               id
          }
     });
     console.log("Updated pg_db ✔");

     return res.send(update);
},
)


// Deleting Operator

app.delete('/api/:id', async function (req, res) {
     let id = req.params.id

     let del = await tasks.destroy({
          where: {
               id
          }
     });
     console.log("Item deleted ✔");

     return res.send("deleted");
},
)


// TRELLO TASK

app.use(bodyParser.json());
app.get('/hook', function (req, res) {
     // res.send('Hello World');

     console.log("web hook triggered...");
     console.log(req.body);

     // res.status(200).end();
})

app.post('/hook', function (req, res) {
     console.log(req.body);
     res.send('Successful');
})
app.listen(8080);


const dummyData = [
     {
          "name": "Bilal",
          "title": "Senior Developer",
          "Age": "22"
     },
     {
          "name": "Bilal",
          "title": "Senior Developer",
          "Age": "22"
     },
     {
          "name": "Bilal",
          "title": "Senior Developer",
          "Age": "22"
     },
     {
          "name": "Bilal",
          "title": "Senior Developer",
          "Age": "22"
     }
]


// var express = require("express");

// http.createServer(function (request, response) {
//      // Send Http head
//      // Status is cleared for 200, Ok
//      // Content-type: text/plain
//      response.writeHead(200, { 'Content-type': 'text/plain' });

//      // Sending response body as "Hello World!"
//      response.end("Hello World!\n");
// }).listen(8081);



// Console your server
// console.log("Your server is running at port 8081 => http://127.0.0.1:8081/")
