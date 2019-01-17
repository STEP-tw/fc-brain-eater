const commentAdder = require("./addComment");
const fileHandler = require("./fileHandler");
const Sheeghra = require("./shegra");
const send = require("./send");

const generateGuestBookPage = require("./create_GuestBook_HTML");
const app = new Sheeghra();

const logRequestUrl = function(req, res, next) {
  console.log(req.url);
  next();
};

const guestBookHandler = function(req, res) {
  res.write(generateGuestBookPage());
  send(res, 200, "");
};

app.use(logRequestUrl);
app.post("/Guest_book.html", commentAdder);
app.get("/Guest_book.html", guestBookHandler);
app.use(fileHandler);
app.post("/");
module.exports = app.handleRequest.bind(app);
