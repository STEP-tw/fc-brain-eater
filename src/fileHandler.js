const fs = require("fs");
const send = require("./send");
const ROOT = "./public";
const HOME = "/index.html";

const getFilePath = function(url) {
  if (url == "/") {
    return ROOT + HOME;
  }
  return ROOT + url;
};

const fileHandler = function(req, res) {
  const filePath = getFilePath(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      send(res, 404, "");
      return 1;
    }
    send(res, 200, data);
  });
};

module.exports = fileHandler;
