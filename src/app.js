const { readFile } = require("fs");
const app = (req, res) => {
  res.statusCode = 202;
  let reqHandled = false;
  if (req.url == "/") {
    readFile("./src/pages/index.html", "utf-8", function(err, data) {
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  if (req.url == "/style.css") {
    readFile("./src/pages/style.css", "utf-8", function(err, data) {
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  if (req.url == "/resources/freshorigins.jpg") {
    readFile("./src/resources/freshorigins.jpg", function(err, data) {
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  let relateFlowerGifUrl = "/resources/animated-flower-image-0021.gif";
  if (req.url == relateFlowerGifUrl) {
    readFile("./src" + relateFlowerGifUrl, function(err, data) {
      res.write(data);
      res.end();
    });
    reqHandled = true;
  }
  if (!reqHandled) {
    res.statusCode = 404;
    res.end();
  }
};

// Export a function that can act as a handler

module.exports = app;
