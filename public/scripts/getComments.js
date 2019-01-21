const loadComments = function(document) {
  let commentsDiv = document.getElementById("commentsTable");
  fetch("/commentsTable")
    .then(function(res) {
      return res.text();
    })
    .then(function(data) {
      commentsDiv.innerHTML = data;
    });
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
  // const addCommentBtn = document.getElementById("addCommentBtn");
  // addCommentBtn.onclick = updateComment.bind(null, document);
  refreshButton.onclick = loadComments.bind(null, document);
};

window.onload = initialize;
