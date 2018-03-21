const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const { AllProducts, Product } = require('./db/products');
// const _Articles = require('./db/aritlces');
// const _AllProducts = new AllProducts();
AllProducts.addProduct(new Product('Steve', 24, 5));
AllProducts.addProduct(new Product('Ann', 22, 10));

const jsonParser = bodyParser.json();
const app = express();
const PORT = 8080;

app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/products', (req, res) => {
  /*responds with HTML generated from your template which displays all Products added thus far.
file name: index.hbs*/
  res.render('index', {
    title: 'Products',
    allProducts: AllProducts.getAllProducts()
  });
});

app.get('/products/new', (req, res) => {
  /*responds with HTML generated from your templates.
The HTML should contain an empty form which a user will be able to create a new product. This form points to your server's route for creating a new product.
file name: new.hbs*/
  res.render('new');
});

app.get('/products/:id', (req, res) => {
  /*responds with HTML generated from your template which displays the Products information for the product with the corresponding id.
file name: product.hbs*/
  const ArrayOfMatchingProducts = AllProducts.getAllProducts().reduce(
    (a, c) => {
      if (c.id === Number(req.params.id)) {
        a.push(c);
      }
      return a;
    },
    []
  );
  if (ArrayOfMatchingProducts.length === 1) {
    const { id, name, price, inventory } = ArrayOfMatchingProducts[0];
    res.render('product', {
      id,
      name,
      price,
      inventory
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
});

app.get('/products/:id/edit', (req, res) => {
  /*responds with HTML generated from your templates.
The HTML should contain a form (with values already pre-filled?) so that a user can update the information for a product. This form points to your server's route for editing a product.
file name: edit.hbs*/
  const ArrayOfMatchingProducts = AllProducts.getAllProducts().reduce(
    (a, c) => {
      if (c.id === Number(req.params.id)) {
        a.push(c);
      }
      return a;
    },
    []
  );
  if (ArrayOfMatchingProducts.length === 1) {
    const { id, name, price, inventory } = ArrayOfMatchingProducts[0];
    res.render('edit', {
      id,
      name,
      price,
      inventory
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }

  //////////////////TO DO!!!!!! edit edit.hbs to make PUT request to server///////////////////
});

app.post('/products', (req, res) => {
  /*creates a new product
  The incoming request will look like this: { name: String, price: String, inventory: String }
  from this request you will save your data as { id: Number, name: String, price: Number, inventory: Number }
  id is a unique identifier for this item. You will generate this on the server side and it will be used to access specific products with it
  If successful then redirect the user back to the /products route.*/
  const name = req.body.name;
  // verify price is a number and cut off any remaining decimals
  const price = parseInt(Number(req.body.price) * 100) / 100;
  // verify that inventory is a number
  const inventory = Number(req.body.inventory);
  // verify that name, price, and inventory is input with valid inputs
  if (name && price && inventory) {
    const newProduct = new Product(name, price, inventory);
    AllProducts.addProduct(newProduct);
    res.redirect('/products');
  } else {
    /*If not successful then send the user back to the new product route, /products/new and some way to communicate the error back to the user via templating.*/
    //////////////////////TO DO!!!!!!!!///////////////////////////////
    res.send(req.body);
  }
});

app.put('/products/:id', (req, res) => {
  /*edits a product. Finds a product in a collection with the same id value and updates the information.
The incoming request will look like this: { id: Number, ... }
... represents a field to be edited for example: if the server was sent { id: 12, name: "Water Bed" } the server will find the product with an id of 12 and change the name property to be "Water Bed".
If successful then redirect the user back to the /products/:id route, where :id is the product that was just edited, so that they can see the updated resource.
*/
  const id = Number(req.params.id);
  const name = req.body.name;
  // verify price is a number and cut off any remaining decimals
  const price = parseInt(Number(req.body.price) * 100) / 100;
  // verify that inventory is a number
  const inventory = Number(req.body.inventory);
  // verify that name, price, and inventory is input with valid inputs
  if (id && (name || price || inventory)) {
    const ArrayOfMatchingProducts = AllProducts.getAllProducts().reduce(
      (a, c) => {
        if (c.id === Number(req.params.id)) {
          a.push(c);
        }
        return a;
      },
      []
    );
    if (ArrayOfMatchingProducts.length === 1) {
      const indexOfMatchingProduct = AllProducts.storage.indexOf(
        ArrayOfMatchingProducts[0]
      );
      if (name) {
        AllProducts.storage[indexOfMatchingProduct].name = name;
      }
      if (price) {
        AllProducts.storage[indexOfMatchingProduct].price = price;
      }
      if (inventory) {
        AllProducts.storage[indexOfMatchingProduct].inventory = inventory;
      }
      res.redirect('/products');
    } else {
      res.status(404).render('404', { url: req.url });
    }
  } else {
    /*If not successful then send the user back to the new product route, /products/:id/edit and some way to communicate the error back to the user via templating.*/
    //////////////////////TO DO!!!!!!!!///////////////////////////////
    res.send(req.body);
  }
});

app.delete('/products/:id', (req, res) => {
  /* removes a product by it's id.
If successful then redirect the user back to the /products page and some way to communicate to the user that this action was successful.*/
  const id = Number(req.params.id);
  if (id) {
    const ArrayOfMatchingProducts = AllProducts.getAllProducts().reduce(
      (a, c) => {
        if (c.id === Number(req.params.id)) {
          a.push(c);
        }
        return a;
      },
      []
    );
    if (ArrayOfMatchingProducts.length === 1) {
      const indexOfMatchingProduct = AllProducts.storage.indexOf(
        ArrayOfMatchingProducts[0]
      );
      AllProducts.storage.splice(indexOfMatchingProduct, 1);
      res.redirect('/products');
    } else {
      res.status(404).render('404', { url: req.url });
    }
  } else {
    /*If not successful then send the user back to the new product route, /products/:id, where :id is the product that was just edited and a message that this action was unsucessful. */
    //////////////////////TO DO!!!!!!!!///////////////////////////////
    res.send(req.body);
  }
});

////////////////////////////////////////////////////////////////////////

app.get('/articles', (req, res) => {
  /*responds with HTML generated from your template which displays all Articles added thus far.
file name: index.hbs*/
  res.render('index', {
    title: 'Articles',
    allProducts: AllProducts.getAllProducts()
  });
});

app.get('/articles/:title', (req, res) => {
  /*responds with HTML generated from your template which displays the Article information for the article with the corresponding title.
file name: article.hbs*/
});

app.get('/articles/:title/edit', (req, res) => {
  /*responds with HTML generated from your templates.
The HTML should contain a form (with values already pre-filled?) so that a user can update the information for an article. This form points to your server's route for editing an article.
file name: edit.hbs*/
});

app.get('/articles/new', (req, res) => {
  /*responds with HTML generated from your templates.
The HTML should contain an empty form which a user will be able to create a new article. This form points to your server's route for creating a new article.
file name: new.hbs*/
});

app.post('/articles', (req, res) => {
  /*creates a new article
The incoming request will look like this: { title: String, body: String, author: String }
from this request you will save your data as { title: String, body: String, author: String, urlTitle: String }
title is a unique identifier for this item.
urlTitle is similar to the title that was passed in but instead is a URL Encoded version. Javascript has a native way to url-encode strings. example: If given a title of "The Best Magpie Developer of 2016", it's url-encoded equivilent is "The%20Best%20Magpie%20Developer%20of%202016".
If successful then redirect the user back to the /articles route.
If not successful then send the user back to the new article route, /articles/new and some way to communicate the error back to the user via templating.*/
});

app.put('/articles/:title', (req, res) => {
  /*edits a product. Finds an article in a collection with the same title value and updates the information.
The incoming request will look like this: { title: String, ... }
... represents a field to be edited for example: if the server was sent { title: "The Best Magpie Developer of 2016" } the server will find an article with a title property to be "The Best Magpie Developer of 2016".
If successful then redirect the user back to the /articles/:title route, where :title is the article that was just edited, so that they can see the updated resource.
If not successful then send the user back to the new article route, /article/:title/edit and some way to communicate the error back to the user via templating.*/
});

app.delete('/articles/:title', (req, res) => {
  /*removes a article by it's title.
If successful then redirect the user back to the /articles page and some way to communicate to the user that this action was successful.
If not successful then send the user back to the new article route, /article/:title, where :title is the article that was just edited and a message that this action was unsucessful.*/
});

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
//testing123
