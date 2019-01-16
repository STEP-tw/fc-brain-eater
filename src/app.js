const { readFile } = require("fs");
const app = (req, res) => {
  res.statusCode = 404;
  if (req.url == "/") {
    readFile("./src/index.html", "utf-8", function(err, data) {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  }
  if (req.url == "/style.css") {
    readFile("./src/style.css", "utf-8", function(err, data) {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
  }
};

// Export a function that can act as a handler

module.exports = app;
