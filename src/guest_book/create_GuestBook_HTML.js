const fs = require("fs");
const { headPart, tailPart } = require("./guest_book_template");

const generateGuestBookPage = function(commentsList) {
  let commentsTbody = createTableBody(commentsList);
  let html = headPart + commentsTbody + tailPart;
  return html;
};

const createTableBody = function(comments) {
  let rows = comments
    .map(
      comment =>
        `<tr><td>${comment.dataTime}</td>
    <td><pre>${comment.name}</pre></td>
    <td><pre>${comment.comment}</pre></td></tr>`
    )
    .reverse()
    .join("");
  return `<tbody>${rows}</tbody>`;
};

module.exports = generateGuestBookPage;
