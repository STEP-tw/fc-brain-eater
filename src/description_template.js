const generateDescriptionHtml = function(title, content, paths) {
  const { imagePath, downloadLink } = paths;

  return `<html>
  <head>
    <link rel="stylesheet" href="/resources/styles/style.css" />
    <title>${title}</title>
  </head>
  <body>
    <header>
      <h1><a href="/index.html"><<</a>${title}</h1>
    </header>
    <main>
      <img src=${imagePath} alt="${title}" />
      <div class="description">
        ${content}
        <a href="${downloadLink}">Download as book</a>
      </div>
    </main>
  </body>
</html>`;
};

module.exports = generateDescriptionHtml;
