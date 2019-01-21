const commentAdder = require("./guest_book/addComment");
const fileHandler = require("./fileHandler");
const fs = require("fs");
const Sheeghra = require("./shegra");
const send = require("./send");
const generateCommentsTable = require("./guest_book/create_GuestBook_HTML");
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

let comments = new Comments(fs, commentsFilePath);
comments.load();

const commentsListHandler = function(req, res) {
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.write(JSON.stringify(comments.list));
  res.end();
};

const getPostedData = function(req, res, next) {
  let data = "";
  req.on("data", chunk => {
    data = data + chunk;
  });
  req.on("end", function() {
    req.data = data;
    next();
  });
};

app.use(logRequestUrl);
app.use(getPostedData);
app.get("/commentsTable", commentsListHandler);
app.post("/addComment", commentAdder.bind(null, comments));
app.get("/abeliophyllum.html", abeliophyllumHandler);
app.get("/ageratum.html", ageratumHandler);
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
