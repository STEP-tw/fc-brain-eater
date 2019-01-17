const saveComments = require("./saveCommentsHandler");
const fileHandler = require("./fileHandler");

const requestHandlers = {
  "/Guest_book.html": saveComments
};

const app = (req, res) => {
  let [fileName, args] = req.url.split("?");
  if (!args) {
    fileHandler(req, res);
    return 0;
  }
  let handler = requestHandlers[fileName];
  handler(req, res, args);
};

// Export a function that can act as a handler

module.exports = app;
