const fs = require("fs");
const ROOT = "./public";
const HOME = "/index.html";

const getFilePath = function(url) {
  if (url == "/") {
    return ROOT + HOME;
  }
  return ROOT + url;
};

const send = function(res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const app = (req, res) => {
  const filePath = getFilePath(req.url);

  fs.readFile(filePath, function(err, data) {
    if (err) {
      send(res, 404, "");
      return 1;
    }
    send(res, 200, data);
  });
};

// Export a function that can act as a handler

module.exports = app;
