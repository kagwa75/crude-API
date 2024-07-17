const http = require('http');//require imports built-in httpmodule in node.js

const getReq = require("./methods/get");
const deleteReq = require("./methods/delete");
const postReq = require("./methods/post");
const putReq = require("./methods/put");
const movies = require("./movies/movies.json");

//require('dotenv').config();
const PORT = process.env.PORT || 5003;


const server = http.createServer((req, res) => {
   req.movies = movies;
    switch(req.method) {
        case "GET":
            getReq(req, res);
            break;
            case "POST":
            postReq(req, res);
            break;
            case "PUT":
            putReq(req, res);
            break;
            case "DELETE":
            deleteReq(req, res);
            break;
            default:
                res.statusCode = 404;
                res.setHeader("Content-Type", "application/json");//indicates the response will be in json format
                res.write(JSON.stringify({title: "not found", message: "Route not found"}));
                res.end(); 
    }
    
});

server.listen(PORT, () => {
    console.log(`server started on port : ${PORT}`);//This line tells the server to start listening for incoming connections on the specified PORT.

});