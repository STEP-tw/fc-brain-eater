class Comments {
  constructor(fs, dataFilePath) {
    this.fs = fs;
    this.dataFilePath = dataFilePath;
  }

  readComments() {
    let commentsJson = this.fs.readFileSync(this.dataFilePath, "utf-8");
    commentsJson = commentsJson.slice(0, -1);
    commentsJson = `[${commentsJson}]`;
    this.commentsList = JSON.parse(commentsJson);
  }
  addComment(commentObj, callback) {
    this.commentsList.push(commentObj);
    const json = JSON.stringify(commentObj) + ",";
    this.fs.appendFile(this.dataFilePath, json, () =>
      callback(this.commentsList)
    );
  }
}

module.exports = Comments;
