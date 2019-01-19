const commentAdder = require("./guest_book/addComment");
const fileHandler = require("./fileHandler");
const fs = require("fs");
const Sheeghra = require("./shegra");
const send = require("./send");
const generateGuestBookPage = require("./guest_book/create_GuestBook_HTML");
const app = new Sheeghra();
const commentsFilePath = "./data/comments.json";
const {
  abeliophyllumHandler,
  ageratumHandler
} = require("./description/descriptionHandlers");
const Comments = require("./guest_book/comments");

const logRequestUrl = function(req, res, next) {
  console.log(req.url);
  next();
};

const guestBookHandler = function(commentsList, req, res) {
  res.write(generateGuestBookPage(commentsList));
  send(res, 200, "");
};

let comments = new Comments(fs, "./data/comments.json");
comments.readComments();

app.use(logRequestUrl);
app.get("/abeliophyllum.html", abeliophyllumHandler);
app.get("/ageratum.html", ageratumHandler);
app.post("/Guest_book.html", commentAdder.bind(null, comments));
app.get("/Guest_book.html", guestBookHandler.bind(null, comments.commentsList));
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
