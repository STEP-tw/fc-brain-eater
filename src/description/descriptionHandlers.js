const fs = require("fs");
const descriptionPage = require("./create_description_page");
const send = require("../send");

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

const ageratumPaths = {
  imagePath: "/resources/images/ageratum.jpg",
  downloadLink: "/resources/books/ageratum.pdf"
};

const abeliophyllumHandler = generateDescPageHandler(
  "Abeliophyllum",
  "./src/contents/abeliophyllum.txt",
  abeliophyllumPaths
);

const ageratumHandler = generateDescPageHandler(
  "Agerantum",
  "./src/contents/ageratum.txt",
  ageratumPaths
);

module.exports = { abeliophyllumHandler, ageratumHandler };
