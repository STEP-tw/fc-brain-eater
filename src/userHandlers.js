const loginHandler = function(req, res) {
  let name = req.body.split("=")[1];
  res.setHeader("Set-Cookie", `userName=${name}`);
  res.writeHead(302, {
    Location: "/guest_book.html"
  });
  res.end();
};

const logoutHandler = function(req, res) {
  const expireTime = "expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  res.setHeader("Set-Cookie", `userName=;${expireTime}`);
  res.writeHead(302, {
    Location: "/guest_book.html"
  });
  res.end();
};

module.exports = { loginHandler, logoutHandler };
