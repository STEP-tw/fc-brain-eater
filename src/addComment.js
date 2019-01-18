const send = require("./send");
const parse = require("./parse");
const generateGuestBookPage = require("./create_GuestBook_HTML");
const fs = require("fs");

const appendComment = function(res, args) {
  let commentObj = parse(args);
  commentObj.dataTime = new Date().toDateString();
  let json = JSON.stringify(commentObj);
  fs.appendFile("./src/comments.json", json + ",", function(err, data) {
    send(res, 200, generateGuestBookPage());
  });
};

const addComment = function(req, res) {
  let args = "";
  req.on("data", chunk => {
    args = args + chunk;
  });
  req.on("end", function() {
    appendComment(res, args);
  });
};

module.exports = addComment;
