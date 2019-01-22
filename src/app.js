const commentAdder = require("./guest_book/addComment");
const fileHandler = require("./fileHandler");
const fs = require("fs");
const send = require("./send");
const Sheeghra = require("./shegra");
const app = new Sheeghra();
const commentsFilePath = "./data/comments.json";
const {
  abeliophyllumHandler,
  ageratumHandler
} = require("./description/descriptionHandlers");
const Comments = require("./guest_book/comments");
const { loginHandler, logoutHandler } = require("./userHandlers.js");

const guestBookTemplates = {};

const readGuestBookTemplates = function(fs) {
  const mainPath = "./src/guestBookTemplate.html";
  const loginFormPath = "./src/loginFormTemplate.html";
  const commentsFormPath = "./src/commentsFormTemplate.html";
  guestBookTemplates.main = fs.readFileSync(mainPath, "utf8");
  guestBookTemplates.loginForm = fs.readFileSync(loginFormPath, "utf8");
  guestBookTemplates.commentsForm = fs.readFileSync(commentsFormPath, "utf8");
};

const logRequest = (req, res, next) => {
  console.log(req.method, req.url);
  console.log("headers =>", JSON.stringify(req.headers, null, 2));
  console.log("body =>", req.body);
  console.log(req.cookies);

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
    req.body = data;
    next();
  });
};

const readCookies = function(req, res, next) {
  const cookie = req.headers["cookie"];
  let cookies = {};
  if (cookie) {
    cookie.split(";").forEach(element => {
      let [name, value] = element.split("=");
      name = name.trim();
      cookies[name] = value;
    });
  }
  req.cookies = cookies;

  next();
};

readGuestBookTemplates(fs);

const guestBookHandler = function(req, res) {
  let { main, loginForm, commentsForm } = guestBookTemplates;
  const { cookies } = req;
  let form = loginForm;
  if (cookies.userName) {
    form = commentsForm;
    form = form.replace("__userName__", cookies.userName);
  }
  main = main.replace("__form__", form);
  send(res, 200, main);
};

app.use(getPostedData);
app.use(readCookies);
app.use(logRequest);

app.post("/login", loginHandler);
app.post("/logout", logoutHandler);
app.get("/guest_book.html", guestBookHandler);
app.get("/commentsList", commentsListHandler);
app.post("/addComment", commentAdder.bind(null, comments));
app.get("/abeliophyllum.html", abeliophyllumHandler);
app.get("/ageratum.html", ageratumHandler);
app.use(fileHandler);

module.exports = app.handleRequest.bind(app);
