const fs = require("fs");
const send = require("./send");
const parse = require("./parse");

const writeToComments = function(comments, newComment, res) {
  comments.push(newComment);
  let json = JSON.stringify(comments);
  fs.writeFile("./src/comments.json", json, function(err) {
    if (err) {
      console.log("Can't write to comments.json");
      send(res, 501, "");
    }
    send(res, 200, "Comment Accepted");
  });
};

const saveComments = function(req, res, args) {
  let commentObj = parse(args);
  commentObj.comment = commentObj.comment.slice(1);
  commentObj.dataTime = new Date().toDateString();
  fs.readFile("./src/comments.json", function(err, data) {
    if (err) {
      console.log(err);
      send(res, 501, "");
    }
    let comments = JSON.parse(data);
    writeToComments(comments, commentObj, res);
  });
};

module.exports = saveComments;
