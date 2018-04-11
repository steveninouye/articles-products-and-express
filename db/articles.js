const { host, user, password, database } = require('./config/config');
let AllArticles = {};
AllArticles.storage = [];

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: host,
    user: user,
    password: password,
    database: database
  }
});

AllArticles.addArticle = (title, body, author, urltitle) => {
  return knex('articles').insert([
    { title: title, body: body, author: author, urltitle: urltitle }
  ]);
};

AllArticles.getAllArticles = () => {
  return knex.select().from('articles');
};

AllArticles.searchForTitle = title => {
  return knex
    .select()
    .where({ title })
    .from('articles');
};

AllArticles.deleteTitle = title => {
  return knex('articles')
    .where('title', title)
    .del();
};

AllArticles.editTitle = (title, body, author) => {
  return knex('articles')
    .where('title', title)
    .update({ body, author });
};

module.exports = {
  // Article,
  AllArticles
};
