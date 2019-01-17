const fs = require("fs");
const send = require("./send");
const parse = require("./parse");

const writeComments = function(comments, res) {
  let json = JSON.stringify(comments);
  fs.writeFile("./src/comments.json", json, function(err) {
    send(res, 200, "Comment Accepted");
  });
};

const saveComments = function(res, args) {
  let commentObj = parse(args);
  commentObj.comment = commentObj.comment.slice(1);
  commentObj.dataTime = new Date().toDateString();
  fs.readFile("./src/comments.json", function(err, data) {
    let comments = JSON.parse(data);
    comments.push(commentObj);
    writeComments(comments, res);
  });
};

const addComment = function(req, res) {
  let args = "";
  req.on("data", chunk => (args = args + chunk));
  req.on("end", function() {
    saveComments(res, args);
  });
};

module.exports = addComment;
