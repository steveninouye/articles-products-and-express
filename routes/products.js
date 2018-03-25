const { AllProducts, Product } = require('../db/products');

AllProducts.addProduct(new Product('Steve', 24, 5));
AllProducts.addProduct(new Product('Ann', 22, 10));

function DELETE_products_ID() {
  return (req, res) => {
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
  };
}

function PUT_products_ID() {
  return (req, res) => {
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
  };
}

function POST_products() {
  return (req, res) => {
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
  };
}

function GET_products_ID_edit() {
  return (req, res) => {
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
      const keys = ['name', 'price', 'inventory'];
      res.render('edit', {
        title: 'product',
        idName: 'ID:',
        idValue: id,
        path: '/products/' + id,
        keys,
        data: ArrayOfMatchingProducts[0]
      });
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function GET_products_ID() {
  return (req, res) => {
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
  };
}

function GET_products_new() {
  return (req, res) => {
    /*responds with HTML generated from your templates.
    The HTML should contain an empty form which a user will be able to create a new product. This form points to your server's route for creating a new product.
    file name: new.hbs*/
    const keys = ['name', 'price', 'inventory'];
    res.render('new', { title: 'Product', path: 'products', keys });
  };
}

function GET_products() {
  return (req, res) => {
    /*responds with HTML generated from your template which displays all Products added thus far.
    file name: index.hbs*/
    const productKeys = Object.keys(AllProducts.storage[0]);
    res.render('index', {
      title: 'product',
      path: 'products',
      keys: productKeys,
      data: AllProducts.getAllProducts()
    });
  };
}
module.exports = {
  DELETE_products_ID,
  PUT_products_ID,
  POST_products,
  GET_products_ID_edit,
  GET_products_new,
  GET_products_ID,
  GET_products
};
