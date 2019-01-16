const app = (req, res) => {
  console.log(req.url);
  res.statusCode = 404;
  if (req.url == "/") {
    res.statusCode = 200;
    res.write("hello");
  }
  res.end();
};

// Export a function that can act as a handler

module.exports = app;
