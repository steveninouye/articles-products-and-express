class _AllArticles {
  constructor() {
    this.storage = [];
  }

  addArticle(article) {
    if (article instanceof Article) {
      this.storage.push(article);
      return true;
    } else {
      throw new Error('Add Valid Product to Products');
    }
  }

  getAllArticles() {
    return this.storage;
  }

  getAllTitles() {
    return this.storage.reduce((a, c) => {
      a.push(c.title);
      return a;
    }, []);
  }

  getIndexOfTitle(title) {
    const returnValue =
      this.getAllTitles().indexOf(title) !== -1
        ? this.getAllTitles().indexOf(title)
        : false;
    return returnValue;
  }

  searchForTitle(title) {
    const returnValue = this.getIndexOfTitle(title)
      ? this.storage[this.getIndexOfTitle(title)]
      : false;
    return returnValue;
  }

  deleteTitle(title) {
    if (this.getIndexOfTitle(title)) {
      this.storage.splice(this.getIndexOfTitle(title), 1);
      return true;
    } else {
      return false;
    }
  }
}

class Article {
  constructor(title, body, author) {
    this.title = title;
    this.body = body;
    this.author = author;
    this.urlTitle = encodeURI(title);
  }

  getTitle() {
    return this.title;
  }

  getBody() {
    return this.body;
  }

  getAuthor() {
    return this.author;
  }

  getURLTitle() {
    return this.urlTitle;
  }

  changeBody(newBody) {
    this.title = newBody;
    return true;
  }

  changeAuthor(newAuthor) {
    this.title = newAuthor;
    return true;
  }
}

const AllArticles = new _AllArticles();

module.exports = {
  Article,
  AllArticles
};
