const generateCommentsTable = function(comments) {
  let rows = comments
    .map(
      comment =>
        `<tr><td>${comment.date}</td>
    <td><pre>${comment.name}</pre></td>
    <td><pre>${comment.comment}</pre></td></tr>`
    )
    .reverse()
    .join("");
  const tableHtml = `<table id="commentsTable">
    <thead>
      <th>Date&Time</th>
      <th>Name</th>
      <th>Comment</th>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
  return tableHtml;
};

module.exports = generateCommentsTable;
