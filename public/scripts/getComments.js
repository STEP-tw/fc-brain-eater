const loadComments = function(document) {
  let commentsDiv = document.getElementById("commentsTable");
  fetch("/commentsTable")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      commentsDiv.innerHTML = createTable(data);
    });
};

const createTable = function(commentObjs) {
  let comments = commentObjs
    .map(commentObj => {
      const { date, name, comment } = commentObj;
      const localDate = new Date(date).toLocaleString();
      return `<p>${localDate} 
    <strong>${name} </strong>
    ${comment}</p>`;
    })
    .reverse()
    .join("");
  return comments;
};

const clearForm = function(form) {
  Object.keys(form).map(key => (form[key].value = ""));
};

const updateStatus = function(document, statusMsg) {
  const status = document.getElementById("status");
  status.hidden = false;
  status.innerText = statusMsg;
};

const updateComment = function(event) {
  event.preventDefault();
  const commentForm = document.getElementById("commentForm");
  let comment = {
    name: commentForm.name.value,
    date: new Date().toJSON(),
    comment: commentForm.comment.value
  };
  fetch("/addComment", {
    method: "POST",
    body: JSON.stringify(comment)
  }).then(() => {
    loadComments(document);
    clearForm(commentForm);
    updateStatus(document, "Thank you for comment");
  });
  return false;
};

const initialize = function() {
  loadComments(document);
  const refreshButton = document.getElementById("refreshBtn");
  refreshButton.onclick = loadComments.bind(null, document);
};

window.onload = initialize;
