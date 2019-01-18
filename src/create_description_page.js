const generateGuestBookPage = require("./description_template");

const descriptionPage = function(title, content, paths) {
  let contentParagraphs = content.split("\n");
  let contentHtml = contentParagraphs.map(para => `<p>${para}</p>`).join("\n");
  return generateGuestBookPage(title, contentHtml, paths);
};

module.exports = descriptionPage;
