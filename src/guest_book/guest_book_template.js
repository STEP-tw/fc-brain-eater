const headPart = `<html>
  <head>
    <link rel="stylesheet" href="/resources/styles/style.css" />
    <title>Guest Book</title>
  </head>
  <body>
    <header>
      <h1 style="text-align: center"><a href="/index.html"><<</a>Guest Book</h1>
    </header>
    <div class="form">
    <form method="POST">
      <legend><h1>Leave a comment</h1></legend>
      <div id="nameInput">
        Name: <input type="text" name="name" id="name" required />
      </div>
      <div id="commentInput" >
        Comment:<textarea rows="4" cols="30" name="comment" required></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div id="comments_list">
      <table><thead><th>Date&Time</th><th>Name</th><th>Comment</th></thead>`;

const tailPart = `</table>
    </div>
  </body>
</html>`;

module.exports = { headPart, tailPart };
