require('dotenv').config();
var express = require('express');
const { Sequelize } = require('sequelize');
// const { tasks, members, Labels, invoices, attachments } = require('./models');
const bodyParser = require("body-parser");
const port = process.env.port;
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
     host: process.env.DB_HOST,
     dialect: process.env.DB_DIALECT
});
try {
     sequelize.authenticate();
     console.log('Connection has been established successfully.');
     console.log(`You can see output at ${port}"`);
     console.log(`All set with database(PostgreSql)...`);
} catch (error) {
     console.error('Unable to connect to the database:', error);
}

var app = express();
app.use(express.json())

// For Tasks...
const taskRoute = require(process.env.REQ_TASK);
app.use('/task', taskRoute);

// For Labels...
const labelRoute = require(process.env.REQ_LABEL);
app.use('/labels', labelRoute);

// For Members...
const memberRoute = require(process.env.REQ_MEMBER);
app.use('/members', memberRoute);

// For Invoices...
const invoiceRoute = require(process.env.REQ_INVOICE);
app.use('/invoices', invoiceRoute);

// For Attachments...
const attachRoute = require(process.env.REQ_ATTACHMENT);
app.use('/attachments', attachRoute);


// TRELLO TASK
app.use(bodyParser.json());
app.listen(port);

// For GET 
const hookRoute = require(process.env.REQ_HOOK);
app.use('/hook', hookRoute);

// For POST
const hookedRoute = require(process.env.REQ_HOOKED);
app.use('/hooked', hookedRoute);

///////////////// Server Completed /////////////////