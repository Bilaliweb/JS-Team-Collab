var express = require('express');
var app = express();
app.use(express.json())
const { Sequelize } = require('sequelize');
const { tasks, members } = require('./models');
const bodyParser = require("body-parser");
const sequelize = new Sequelize('Bilal', 'postgres', 'PostgreSql14', {
     host: 'localhost',
     dialect: 'postgres'
});
try {
     sequelize.authenticate();
     console.log('Connection has been established successfully.');
     console.log(`You can see output at "http://localhost:8080"`);
} catch (error) {
     console.error('Unable to connect to the database:', error);
}


// We used Thunder Client for API Testing.

app.get('/', function (req, res) {
     res.send('Hello World');
})

// app.get('/About', function (req, res) {
//      res.send("This page does't exist...");
// })


// Read operation: 

app.get('/api', async function (req, res) {
     let task = await tasks.findAll();
     return res.send(task)
})


// Create operation

app.post('/api', async function (req, res) {
     const { task_name, description, actual_hour, estimated_hour, invoiceId } = req.body
     let task = await tasks.create({ task_name, description, actual_hour, estimated_hour, invoiceId });

     return res.send(task)
})


// Update Operation

app.put('/api', async function (req, res) {
     const { task_name } = req.body
     let update = await tasks.update({ task_name: " " }, {
          where: {
               task_name: "test"
          }
     });

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

     return res.send("deletd");
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
