class Comment {
  constructor(value) {
    this.value = value;
  }
  render() {
    return "<!--" + this.value + "-->";
  }
}

module.exports = Comment;
