import express from "express";
import bodyParser from 'body-parser';
import http from "http";
import mongo from "./database/mongo";
import router from "./routes";

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongo.connection().then(() => console.log("Mongo Work")).catch(err => console.log(err));

app.use(router);

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
})