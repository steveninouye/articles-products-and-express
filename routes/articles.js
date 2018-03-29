const { AllArticles, Article } = require('../db/articles');

AllArticles.addArticle(
  new Article(
    'Think And Grow Rich',
    `Think and Grow Rich is based on Hill's earlier work The Law of Success, said to be the result of more than twenty years of study of many individuals who had amassed personal fortunes.[3]

  Hill studied their habits and evolved 16 "laws" to be applied to achieve success. Think and Grow Rich condenses them, providing the reader with 13 principles in the form of a "Philosophy of Achievement".[3] Mark Hansen has said time has shown that two of the laws/principles are most important: 1) The MasterMind principle/process and 2) "Know very clearly where you want to go."
  
  The book asserts that desire, faith and persistence can propel one to great heights if one can suppress negative thoughts and focus on long-term goals.`,
    'Napoleon Hill'
  )
);
AllArticles.addArticle(
  new Article(
    'How to Win Friends And Influence People',
    `Having found no “practical, working handbook on human relations,” Mr. Carnegie set out to create one, researching the lives of greats from Julius Caesar to Thomas Edison and interviewing such people as Franklin D. Roosevelt and Clark Gable. If you’ve read some of my other posts, you probably know how much weight I give to the technique of interviewing the outliers to borrow their tools. This book is the application of that method to the science of human interaction.`,
    'Dale Carnegie'
  )
);

function DELETE_articles_TITLE(req, res) {
  const title = req.params.title;
  if (title && AllArticles.deleteTitle(title)) {
    res.redirect('/articles');
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function PUT_articles_TITLE(req, res) {
  const title = req.params.title;
  let { body, author } = req.body;
  body = body.trim();
  author = author.trim();
  if (AllArticles.editTitle(title, body, author)) {
    res.redirect('/articles');
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function POST_articles(req, res) {
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
}

function GET_articles_TITLE_edit(req, res) {
  const articleToEdit = AllArticles.searchForTitle(req.params.title);
  if (articleToEdit) {
    const { title, body, author, urlTitle } = articleToEdit;
    let keys = Object.keys(articleToEdit);
    keys.splice(keys.indexOf('title'), 1);
    keys.splice(keys.indexOf('urlTitle'), 1);
    res.render('edit', {
      title: 'article',
      idName: 'Title',
      idValue: title,
      path: `/articles/${urlTitle}`,
      keys,
      data: articleToEdit
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function GET_articles_TITLE(req, res) {
  const articleToEdit = AllArticles.searchForTitle(req.params.title);
  if (articleToEdit) {
    const { title, body, author, urlTitle } = articleToEdit;
    res.render('article', {
      urlTitle,
      title,
      body,
      author
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function GET_articles_new(req, res) {
  const keys = ['title', 'body', 'author'];
  res.render('new', { title: 'Article', path: 'articles', keys });
}

function GET_articles(req, res) {
  const articleKeys = Object.keys(AllArticles.storage[0]);
  articleKeys.splice(articleKeys.indexOf('urlTitle'), 1);
  res.render('index', {
    title: 'article',
    path: 'articles',
    keys: articleKeys,
    data: AllArticles.getAllArticles()
  });
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
