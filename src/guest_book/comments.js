class Comments {
  constructor(fs, dataFilePath) {
    this.fs = fs;
    this.dataFilePath = dataFilePath;
  }

  load() {
    let commentsJson = "";
    try {
      commentsJson = this.fs.readFileSync(this.dataFilePath, "utf-8");
    } catch (err) {
      if (!this.fs.existsSync("data")) this.fs.mkdirSync("data");
    }
    commentsJson = commentsJson.slice(0, -1);
    commentsJson = `[${commentsJson}]`;
    this.list = JSON.parse(commentsJson);
  }
  add(commentObj) {
    this.list.push(commentObj);
    const json = JSON.stringify(commentObj) + ",";
    this.fs.appendFile(this.dataFilePath, json, err =>
      err ? console.log(err) : 0
    );
  }
}

module.exports = Comments;
