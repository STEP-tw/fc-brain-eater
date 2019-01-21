const send = require("../send");

const addComment = function(comments, req, res) {
  let commentObj = JSON.parse(req.data);
  comments.add(commentObj);
  send(res, 200, "");
};

module.exports = addComment;
