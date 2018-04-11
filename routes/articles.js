const { AllArticles, Article } = require('../db/articles');

const DELETE_articles_TITLE = (req, res) => {
  const title = req.params.title;
  AllArticles.deleteTitle(title)
    .then(data => {
      res.redirect('/articles');
    })
    .catch(err => {
      res.status(404).render('404', { url: req.url });
    });
};

const PUT_articles_TITLE = (req, res) => {
  const title = req.params.title;
  let { body, author } = req.body;
  body = body.trim();
  author = author.trim();
  AllArticles.editTitle(title, body, author)
    .then(data => {
      res.redirect('/articles');
    })
    .catch(err => {
      res.status(404).render('404', { url: req.url });
    });
};

const POST_articles = (req, res) => {
  const title = req.body.title.trim();
  const body = req.body.body.trim();
  const author = req.body.author.trim();
  if (title && body && author) {
    const urltitle = encodeURI(title);
    AllArticles.addArticle(title, body, author, urltitle)
      .then(data => {
        res.redirect('/articles');
      })
      .catch(err => {
        res.status(404).render('404', { url: req.url });
      });
  }
};

const GET_articles_TITLE_edit = (req, res) => {
  AllArticles.searchForTitle(req.params.title)
    .then(data => {
      const { title, body, author, urltitle } = data[0];
      let keys = Object.keys(data[0]);
      keys.splice(keys.indexOf('title'), 1);
      keys.splice(keys.indexOf('urltitle'), 1);
      keys.splice(keys.indexOf('article_id'), 1);
      res.render('edit', {
        title: 'article',
        idName: 'Title',
        idValue: title,
        path: `/articles/${urltitle}`,
        keys,
        data: data[0]
      });
    })
    .catch(err => {
      res.status(404).render('404', { url: req.url });
    });
};

const GET_articles_TITLE = (req, res) => {
  AllArticles.searchForTitle(req.params.title)
    .then(data => {
      const { title, body, author, urltitle } = data[0];
      res.render('article', {
        urltitle,
        title,
        body,
        author
      });
    })
    .catch(err => {
      res.status(404).render('404', { url: req.url });
    });
};

const GET_articles_new = (req, res) => {
  const keys = ['title', 'body', 'author'];
  res.render('new', { title: 'Article', path: 'articles', keys });
};

const GET_articles = (req, res) => {
  AllArticles.getAllArticles().then(data => {
    const articleKeys = Object.keys(data[0]);
    articleKeys.splice(articleKeys.indexOf('urltitle'), 1);
    res.render('index', {
      title: 'article',
      path: 'articles',
      keys: articleKeys,
      data: data
    });
  });
};

module.exports = {
  DELETE_articles_TITLE,
  PUT_articles_TITLE,
  POST_articles,
  GET_articles,
  GET_articles_new,
  GET_articles_TITLE,
  GET_articles_TITLE_edit
};
