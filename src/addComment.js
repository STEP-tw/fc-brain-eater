const send = require("./send");
const parse = require("./parse");
const generateGuestBookPage = require("./create_GuestBook_HTML");
const fs = require("fs");

const appendComment = function(res, json, commentsList) {
  fs.appendFile("./data/comments.json", json + ",", function(err, data) {
    send(res, 200, generateGuestBookPage(commentsList));
  });
};

const addComment = function(comments, req, res) {
  let args = "";
  req.on("data", chunk => {
    args = args + chunk;
  });
  req.on("end", function() {
    let { commentsList } = comments;
    let commentObj = parse(args);
    commentObj.dataTime = new Date().toDateString();
    commentsList.push(commentObj);
    let json = JSON.stringify(commentObj);
    appendComment(res, json, commentsList);
  });
};

module.exports = addComment;
