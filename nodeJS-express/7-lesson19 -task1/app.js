let http = require("http"),
  fs = require("fs");

let server = http.createServer(function (request, response) {
  if (request.url === "/") {
    fs.readFile(
      "./about/index.html", { encoding: "utf8" },  function (error, file) {
        if (!error) {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(file);
          response.end();
        }
      }
    );
  }
  if (request.url === "/coffee") {
    fs.readFile(
      "./coffee/index.html",
      { encoding: "utf8" },
      function (error, file) {
        if (!error) {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(file);
          response.end();
        }
      }
    );
  }
  if (request.url === "/music") {
    fs.readFile(
      "./music/index.html",
      { encoding: "utf8" },
      function (error, file) {
        if (!error) {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(file);
          response.end();
        }
      }
    );
  }
});
server.listen(3000);
