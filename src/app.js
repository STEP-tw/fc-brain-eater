const commentAdder = require("./addComment");
const fileHandler = require("./fileHandler");
const fs = require("fs");
const Sheeghra = require("./shegra");
const send = require("./send");
const generateGuestBookPage = require("./create_GuestBook_HTML");
const app = new Sheeghra();
const commentsFilePath = "./data/comments.json";

const logRequestUrl = function(req, res, next) {
  console.log(req.url);
  next();
};

const guestBookHandler = function(commentsList, req, res) {
  res.write(generateGuestBookPage(commentsList));
  send(res, 200, "");
};

class Comments {
  readComments(path, fs) {
    let commentsJson = fs.readFileSync(path, "utf-8");
    commentsJson = commentsJson.slice(0, -1);
    commentsJson = `[${commentsJson}]`;
    this.commentsList = JSON.parse(commentsJson);
    console.log(this.commentsList);
  }
  addComment(commentObj) {
    this.commentsList.push(commentObj);
  }
}

let comments = new Comments();
comments.readComments(commentsFilePath, fs);

app.use(logRequestUrl);
app.post("/Guest_book.html", commentAdder.bind(null, comments));
app.get("/Guest_book.html", guestBookHandler.bind(null, comments.commentsList));
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
