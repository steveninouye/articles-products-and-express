const { AllArticles, Article } = require('../db/articles');

AllArticles.addArticle(
  new Article('Red Fern Grows', 'this is a scary story', 'Steven King')
);
AllArticles.addArticle(
  new Article('GooseBumps', 'kids scary stories', 'Stan Sherriff')
);

function DELETE_articles_TITLE() {
  return (req, res) => {
    const title = req.params.title;
    if (title && AllArticles.deleteTitle(title)) {
      res.redirect('/articles');
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function PUT_articles_TITLE() {
  return (req, res) => {
    const title = req.params.title;
    let { body, author } = req.body;
    //trim any excess white space from beginning and ending of data input
    body = body.trim();
    author = author.trim();
    if (AllArticles.editTitle(title, body, author)) {
      res.redirect('/articles');
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function POST_articles() {
  return (req, res) => {
    const title = req.body.title.trim();
    const body = req.body.body.trim();
    const author = req.body.author.trim();
    if (title && body && author) {
      const newArticle = new Article(title, body, author);
      AllArticles.addArticle(newArticle);
      res.redirect('/articles');
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function GET_articles_TITLE_edit() {
  return (req, res) => {
    /*responds with HTML generated from your templates.
    The HTML should contain a form (with values already pre-filled?) so that a user can update the information for an article. This form points to your server's route for editing an article.
    file name: edit.hbs*/
    const ArrayOfMatchingArticles = AllArticles.getAllArticles().reduce(
      (a, c) => {
        if (c.title === req.params.title) {
          a.push(c);
        }
        return a;
      },
      []
    );
    if (ArrayOfMatchingArticles.length === 1) {
      const { urlTitle, title, body, author } = ArrayOfMatchingArticles[0];
      let keys = ['body', 'author'];
      res.render('edit', {
        title: 'article',
        idName: 'Title',
        idValue: title,
        path: `/articles/${urlTitle}`,
        keys,
        data: ArrayOfMatchingArticles[0]
      });
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function GET_articles_TITLE() {
  return (req, res) => {
    /*responds with HTML generated from your template which displays the Article information for the article with the corresponding title.
    file name: article.hbs*/
    const ArrayOfMatchingArticles = AllArticles.getAllArticles().reduce(
      (a, c) => {
        if (c.title === req.params.title) {
          a.push(c);
        }
        return a;
      },
      []
    );
    if (ArrayOfMatchingArticles.length === 1) {
      const { urlTitle, title, body, author } = ArrayOfMatchingArticles[0];
      res.render('article', {
        urlTitle,
        title,
        body,
        author
      });
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function GET_articles_new() {
  return (req, res) => {
    /*responds with HTML generated from your templates.
    The HTML should contain an empty form which a user will be able to create a new article. This form points to your server's route for creating a new article.
    file name: new.hbs*/
    const keys = ['title', 'body', 'author'];
    res.render('new', { title: 'Article', path: 'articles', keys });
  };
}

function GET_articles() {
  return (req, res) => {
    /*responds with HTML generated from your template which displays all Articles added thus far.
    file name: index.hbs*/
    const articleKeys = Object.keys(AllArticles.storage[0]);
    articleKeys.splice(articleKeys.indexOf('urlTitle'), 1);
    res.render('index', {
      title: 'article',
      path: 'articles',
      keys: articleKeys,
      data: AllArticles.getAllArticles()
    });
  };
}

module.exports = {
  DELETE_articles_TITLE,
  PUT_articles_TITLE,
  POST_articles,
  GET_articles,
  GET_articles_new,
  GET_articles_TITLE,
  GET_articles_TITLE_edit
};
