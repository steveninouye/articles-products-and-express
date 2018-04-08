const { host, user, password, database } = require('./config/config');
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: host,
    user: user,
    password: password,
    database: database
  }
});

// knex
//   //   .raw('SELECT * FROM test_table')
//   .select()
//   .from('test_table')
//   .then(data => {
//     console.log(data);
//     knex.destroy();
//   })
//   .catch(err => {
//     console.log(err);
//     knex.destroy();
//   });

class _AllArticles {
  constructor() {
    this.storage = [];
  }

  addArticle(article) {
    if (article instanceof Article) {
      this.storage.push(article);
      return true;
    } else {
      return false;
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
    const returnValue =
      this.getIndexOfTitle(title) !== false
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

  editTitle(title, body, author) {
    title = title.trim();
    body = body.trim();
    author = author.trim();
    if (this.getIndexOfTitle(title) !== false && body && author) {
      this.storage[this.getIndexOfTitle(title)].body = body;
      this.storage[this.getIndexOfTitle(title)].author = author;
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
}

const AllArticles = new _AllArticles();

module.exports = {
  Article,
  AllArticles
};
