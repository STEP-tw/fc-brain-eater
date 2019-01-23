class Comments {
  constructor(list) {
    this.list = list;
  }

  add(commentObj) {
    this.list.push(commentObj);
  }
}

module.exports = Comments;
