const { AllProducts, Product } = require('../db/products');

AllProducts.addProduct(new Product('Steve', 24, 5));
AllProducts.addProduct(new Product('Ann', 22, 10));

function DELETE_products_ID() {
  return (req, res) => {
    const id = Number(req.params.id);
    if (id && AllProducts.deleteProduct(id)) {
      res.redirect('/products');
    } else {
      /*If not successful then send the user back to the new product route, /products/:id, where :id is the product that was just edited and a message that this action was unsucessful. */
      //////////////////////TO DO!!!!!!!!///////////////////////////////
      res.status(404).render('404', { url: req.url });
    }
  };
}

function PUT_products_ID() {
  return (req, res) => {
    const id = Number(req.params.id);
    const { name, price, inventory } = req.body;
    if (AllProducts.editProduct(id, name, price, inventory)) {
      res.redirect('/products');
    } else {
      /*If not successful then send the user back to the new product route, /products/:id/edit and some way to communicate the error back to the user via templating.*/
      //////////////////////TO DO!!!!!!!!///////////////////////////////
      res.status(404).render('404', { url: req.url });
    }
  };
}

function POST_products() {
  return (req, res) => {
    const name = req.body.name.trim();
    const price = parseInt(Number(req.body.price.trim()) * 100) / 100;
    const inventory = Number(req.body.inventory.trim());
    if (name && price && inventory) {
      const newProduct = new Product(name, price, inventory);
      AllProducts.addProduct(newProduct);
      res.redirect('/products');
    } else {
      /*If not successful then send the user back to the new product route, /products/new and some way to communicate the error back to the user via templating.*/
      //////////////////////TO DO!!!!!!!!///////////////////////////////
      res.status(404).render('404', { url: req.url });
    }
  };
}

function GET_products_ID_edit() {
  return (req, res) => {
    const productToEdit = AllProducts.searchForProduct(Number(req.params.id));
    if (productToEdit) {
      const { id, name, price, inventory } = productToEdit;
      let keys = Object.keys(productToEdit);
      keys.splice(keys.indexOf('id'), 1);
      res.render('edit', {
        title: 'product',
        idName: 'ID:',
        idValue: id,
        path: '/products/' + id,
        keys,
        data: productToEdit
      });
    } else {
      res.status(404).render('404', { url: req.url });
    }
  };
}

function GET_products_ID() {
  return (req, res) => {
    const productToEdit = AllProducts.searchForProduct(Number(req.params.id));
    if (productToEdit) {
      const { id, name, price, inventory } = productToEdit;
      let keys = Object.keys(productToEdit);
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
    const keys = ['name', 'price', 'inventory'];
    res.render('new', { title: 'Product', path: 'products', keys });
  };
}

function GET_products() {
  return (req, res) => {
    /*responds with HTML generated from your template which displays all Products added thus far.
    file name: index.hbs*/
    const productKeys = AllProducts.storage[0]
      ? Object.keys(AllProducts.storage[0])
      : ['id', 'name', 'price', 'inventory'];
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
