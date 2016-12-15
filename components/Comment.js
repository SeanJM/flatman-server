class Comment {
  constructor(value) {
    this.value = value;
  }
  render() {
    return '<!--' + value + '-->';
  }
}

module.exports = Comment;
