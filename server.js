const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(require('express-method-override')());

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('capitalFirstLetter', str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

const {
  DELETE_products_ID,
  PUT_products_ID,
  POST_products,
  GET_products_ID_edit,
  GET_products_new,
  GET_products_ID,
  GET_products
} = require('./routes/products');

app.get('/', (req, res) => res.render('home'));

app.get('/products', GET_products());

app.get('/products/new', GET_products_new());

app.get('/products/:id', GET_products_ID());

app.get('/products/:id/edit', GET_products_ID_edit());

app.post('/products', POST_products());

app.put('/products/:id', PUT_products_ID());

app.delete('/products/:id', DELETE_products_ID());

////////////////////////////////////////////////////////////////////////
const {
  DELETE_articles_TITLE,
  PUT_articles_TITLE,
  POST_articles,
  GET_articles,
  GET_articles_new,
  GET_articles_TITLE,
  GET_articles_TITLE_edit
} = require('./routes/articles');

app.get('/articles', GET_articles());

app.get('/articles/new', GET_articles_new());

app.get('/articles/:title', GET_articles_TITLE());

app.get('/articles/:title/edit', GET_articles_TITLE_edit());

app.post('/articles', POST_articles());

app.put('/articles/:title', PUT_articles_TITLE());

app.delete('/articles/:title', DELETE_articles_TITLE());

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
