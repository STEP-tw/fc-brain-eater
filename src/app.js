const { readFile } = require("fs");
const app = (req, res) => {
  res.statusCode = 404;
  let reqHandled = false;
  if (req.url == "/") {
    readFile("./src/pages/index.html", "utf-8", function(err, data) {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  if (req.url == "/style.css") {
    readFile("./src/pages/style.css", "utf-8", function(err, data) {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  if (req.url == "/resources/freshorigins.jpg") {
    readFile("./src/resources/freshorigins.jpg", function(err, data) {
      res.statusCode = 200;
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  if (!reqHandled) {
    res.end();
  }
};

// Export a function that can act as a handler

module.exports = app;
