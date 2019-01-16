const hide = function(secs) {
  let gifBucket = event.target;
  gifBucket.style.visibility = "hidden";
  setTimeout(function() {
    gifBucket.style.visibility = "visible";
  }, secs * 1000);
};

const initialize = function() {
  let gifBucket = document.getElementById("flower_bucket");
  gifBucket.onclick = hide.bind(null, 1);
};
window.onload = initialize;
