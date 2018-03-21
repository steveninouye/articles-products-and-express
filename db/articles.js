class _AllArticles {
  constructor() {
    this.storage = [];
  }

  addArticle(article) {
    if (article instanceof Article) {
      this.storage.push(product);
      return true;
    } else {
      throw new Error('Add Valid Product to Products');
    }
  }

  getAllProducts() {
    return this.storage;
  }

  getAllTitles() {
    return this.storage.reduce((a, c) => {
      a.push(c.title);
      return a;
    }, []);
  }

  searchForTitle(title) {
    const indexOfTitle = this.getAllTitles().indexOf(title);
    return this.storage[indexOfTitle];
  }
}

class Article {
  constructor(title, body, author) {
    this.title = title;
    this.body = body;
    this.author = author;
    urlTitle: encodeURI(title);
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

const AllProducts = new _AllProducts();

module.exports = {
  Product,
  AllProducts
};
