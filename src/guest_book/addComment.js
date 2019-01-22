const send = require("../send");

const addComment = function(comments, req, res) {
  let commentObj = JSON.parse(req.body);
  commentObj.name = req.cookies.userName;
  comments.add(commentObj);
  send(res, 200, "");
};

module.exports = addComment;
