const commentAdder = require("./addComment");
const fileHandler = require("./fileHandler");
const fs = require("fs");
const Sheeghra = require("./shegra");
const send = require("./send");
const generateGuestBookPage = require("./create_GuestBook_HTML");
const app = new Sheeghra();
const commentsFilePath = "./data/comments.json";
const descriptionPage = require("./create_description_page");

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
  }
  addComment(commentObj) {
    this.commentsList.push(commentObj);
  }
}

const generateDescPageHandler = function(title, contentPath, paths) {
  return function(req, res) {
    let content = fs.readFileSync(contentPath, "utf-8");
    let pageHtml = descriptionPage(title, content, paths);

    send(res, 200, pageHtml);
  };
};

const abeliophyllumPaths = {
  imagePath: "/resources/images/abeliophyllum.jpg",
  downloadLink: "/resources/books/abeliophyllum.pdf"
};

const abeliophyllumHandler = generateDescPageHandler(
  "Abeliophyllum",
  "./src/contents/abeliophyllum.txt",
  abeliophyllumPaths
);
const ageratumPaths = {
  imagePath: "/resources/images/ageratum.jpg",
  downloadLink: "/resources/books/ageratum.pdf"
};

const ageratumHandler = generateDescPageHandler(
  "Agerantum",
  "./src/contents/ageratum.txt",
  ageratumPaths
);

let comments = new Comments();
comments.readComments(commentsFilePath, fs);

app.use(logRequestUrl);
app.get("/abeliophyllum.html", abeliophyllumHandler);
app.get("/ageratum.html", ageratumHandler);
app.post("/Guest_book.html", commentAdder.bind(null, comments));
app.get("/Guest_book.html", guestBookHandler.bind(null, comments.commentsList));
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
