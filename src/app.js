const fs = require("fs");
const app = (req, res) => {
  let filePath = req.url;

  if (req.url == "/") {
    filePath = "/pages/index.html";
  }

  fs.stat("." + filePath, function(err, stats) {
    if (err != null) {
      res.statusCode = 404;
      res.end();
      return 1;
    }
    fs.readFile("." + filePath, function(err, data) {
      res.statusCode = 202;
      res.write(data);
      res.end();
    });
  });
};

// Export a function that can act as a handler

module.exports = app;
