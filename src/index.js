const express = require("express");
const bodyParser = require('body-parser');
const http = require("http");
const mongo = require("./database/mongo");
const router = require("./routes");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongo.connection().then(() => console.log("Mongo Work")).catch(err => console.log(err));

app.use(router);


server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})