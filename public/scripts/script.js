const loadComments = function(document) {
  let commentsDiv = document.getElementById("commentsList");
  fetch("/commentsList")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      commentsDiv.innerHTML = displayComments(data);
    });
};

const displayComments = function(commentObjs) {
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

const clear = function(elements) {
  elements.map(ele => (ele.value = ""));
};

const updateStatus = function(document, statusMsg) {
  const status = document.getElementById("status");
  status.hidden = false;
  status.innerText = statusMsg;
};

const updateComment = function() {
  const comment = document.getElementsByName("comment")[0];
  let commentObj = {
    date: new Date().toJSON(),
    comment: comment.value
  };
  fetch("/addComment", {
    method: "POST",
    body: JSON.stringify(commentObj)
  }).then(() => {
    loadComments(document);
    clear([name, comment]);
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
