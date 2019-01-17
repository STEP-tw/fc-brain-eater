const addComments = require("./saveCommentsHandler");
const fileHandler = require("./fileHandler");
const Sheeghra = require("./shegra");
const app = new Sheeghra();

const logRequestUrl = function(req, res, next) {
  console.log(req.url);
  next();
};

app.use(logRequestUrl);
app.post("/Guest_book.html", addComments);
app.use(fileHandler);

app.post("/");
module.exports = app.handleRequest.bind(app);
