const send = require("../send");
const parse = require("../parse");
const generateGuestBookPage = require("./create_GuestBook_HTML");

const addComment = function(comments, req, res) {
  let args = "";
  req.on("data", chunk => {
    args = args + chunk;
  });
  req.on("end", function() {
    let commentObj = parse(args);
    commentObj.dataTime = new Date().toDateString();
    const sendResonse = function(commentsList) {
      send(res, 200, generateGuestBookPage(commentsList));
    };
    comments.addComment(commentObj, sendResonse);
  });
};

module.exports = addComment;
