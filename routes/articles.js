const { AllArticles, Article } = require('../db/articles');

AllArticles.addArticle(
  new Article('Red Fern Grows', 'this is a scary story', 'Steven King')
);
AllArticles.addArticle(
  new Article('GooseBumps', 'kids scary stories', 'Stan Sherriff')
);

function DELETE_articles_TITLE() {
  return (req, res) => {
    /*removes a article by it's title.
    If successful then redirect the user back to the /articles page and some way to communicate to the user that this action was successful.
    If not successful then send the user back to the new article route, /article/:title, where :title is the article that was just edited and a message that this action was unsucessful.*/
    const title = req.params.title;
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
      const indexOfMatchingArticle = AllArticles.storage.indexOf(
        ArrayOfMatchingArticles[0]
      );
      AllArticles.storage.splice(indexOfMatchingArticle, 1);
      res.redirect('/articles');
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function PUT_articles_TITLE() {
  return (req, res) => {
    /*edits a product. Finds an article in a collection with the same title value and updates the information.
    The incoming request will look like this: { title: String, ... }
    ... represents a field to be edited for example: if the server was sent { title: "The Best Magpie Developer of 2016" } the server will find an article with a title property to be "The Best Magpie Developer of 2016".
    If successful then redirect the user back to the /articles/:title route, where :title is the article that was just edited, so that they can see the updated resource.
    If not successful then send the user back to the new article route, /article/:title/edit and some way to communicate the error back to the user via templating.*/
    let { body, author } = req.body;
    //trim any excess white space from beginning and ending of data input
    body = body.trim();
    author = author.trim();
    //get length of each data input without whitespaces
    const lengthOfBody = body.length;
    const lengthOfAuthor = author.length;
    if (lengthOfBody > 0 && lengthOfAuthor > 0) {
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
        const indexOfMatchingArticle = AllArticles.storage.indexOf(
          ArrayOfMatchingArticles[0]
        );
        if (body) {
          AllArticles.storage[indexOfMatchingArticle].body = body;
        }
        if (author) {
          AllArticles.storage[indexOfMatchingArticle].author = author;
        }
        res.redirect('/articles');
      } else {
        res.status(404).render('404', { url: req.url });
      }
    } else {
      /*If not successful then send the user back to the new product route, /products/new and some way to communicate the error back to the user via templating.*/
      //////////////////////TO DO!!!!!!!!///////////////////////////////
      res.send(req.body);
    }
  };
}

function POST_articles() {
  return (req, res) => {
    /*creates a new article
    The incoming request will look like this: { title: String, body: String, author: String }
    from this request you will save your data as { title: String, body: String, author: String, urlTitle: String }
    title is a unique identifier for this item.
    urlTitle is similar to the title that was passed in but instead is a URL Encoded version. Javascript has a native way to url-encode strings. example: If given a title of "The Best Magpie Developer of 2016", it's url-encoded equivilent is "The%20Best%20Magpie%20Developer%20of%202016".
    If successful then redirect the user back to the /articles route.
    If not successful then send the user back to the new article route, /articles/new and some way to communicate the error back to the user via templating.*/
    let { title, body, author } = req.body;
    //trim any excess white space from beginning and ending of data input
    title = title.trim();
    body = body.trim();
    author = author.trim();
    //get length of each data input without whitespaces
    const lengthOfTitle = title.length;
    const lengthOfBody = body.length;
    const lengthOfAuthor = author.length;
    if (lengthOfTitle > 0 && lengthOfBody > 0 && lengthOfAuthor > 0) {
      AllArticles.addArticle(new Article(title, body, author));
      res.redirect('/articles');
    } else {
      /*If not successful then send the user back to the new product route, /products/new and some way to communicate the error back to the user via templating.*/
      //////////////////////TO DO!!!!!!!!///////////////////////////////
      res.send(req.body);
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
