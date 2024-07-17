const requestBodyparser = require("../utility/body.parser");
const writetofile = require("../utility/write-to-file");
module.exports = async (req,res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);//Extract the base URL from the request URL.
    let id = req.url.split("/")[3];// Extract the ID part of the URL
    const regexV4 = new RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
    );
    if (!regexV4.test(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            title: "Validation Failed",
            message: "UUID is not valid",
          })
        );
    } else if(baseUrl === "/api/movies/" && regexV4.test(id)) {
        try {
            let body = await requestBodyparser(req);
            const index = req.movies.findIndex((movie) => {
                return movie.id === id;
            });
            if (index === -1) {
                res.statusCode = 404;
                res.write(
                    JSON.stringify({title: "Not found",message:"movie not found"})
                );
                res.end();
            } else{
                req.movies[index] = {id, ...body};
                writetofile(req.movies);
                res.writeHead(200, {"Content-type": "application/json"});
                res.end(JSON.stringify(req.movies[index]));
            }
        } catch (err) {
           console.log(err);
           res.writeHead(400, {"Content-type": "application/json"});
           res.end(
            JSON.stringify({
                title: "validation failed",
                message: "Request body is not valid",
            })
           );
        }
    }else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
      }
    
};