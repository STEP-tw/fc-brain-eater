const fs = require("fs");
const send = require("../send");

const addComment = function(comments, dataFilePath, req, res) {
  let commentObj = JSON.parse(req.body);
  commentObj.name = req.cookies.userName;
  comments.add(commentObj);
  const json = JSON.stringify(commentObj) + ",";
  fs.appendFile(dataFilePath, json, err => (err ? console.log(err) : 0));
  send(res, 200, "");
};

module.exports = addComment;
