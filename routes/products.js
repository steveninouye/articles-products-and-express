const { AllProducts } = require('../db/products');

function DELETE_products_ID(req, res) {
  const id = Number(req.params.id);
  if (id) {
    AllProducts.deleteProduct(id).then(data => {
      res.redirect('/products');
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function PUT_products_ID(req, res) {
  const id = Number(req.params.id);
  const { name, price, inventory } = req.body;
  if (id && name && price && inventory) {
    AllProducts.editProduct(id, name, price, inventory).then(data => {
      res.redirect('/products');
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function POST_products(req, res) {
  const name = req.body.name.trim();
  const price = parseInt(Number(req.body.price.trim()) * 100) / 100;
  const inventory = Number(req.body.inventory.trim());
  if (name && price && inventory) {
    AllProducts.addProduct(name, price, inventory).then(data => {
      res.redirect('/products');
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function GET_products_ID_edit(req, res) {
  let productID = Number(req.params.id);
  if (productID) {
    AllProducts.searchForProduct(productID).then(data => {
      const { name, price, inventory, product_id } = data[0];
      let keys = Object.keys(data[0]);
      keys.splice(keys.indexOf('product_id'), 1);
      res.render('edit', {
        title: 'product',
        idName: 'ID',
        idValue: product_id,
        path: '/products/' + product_id,
        keys,
        data: data[0]
      });
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function GET_products_ID(req, res) {
  let productID = Number(req.params.id);
  if (productID) {
    AllProducts.searchForProduct(productID).then(data => {
      const { name, price, inventory, product_id } = data[0];
      res.render('product', { name, price, inventory, product_id });
    });
  } else {
    res.status(404).render('404', { url: req.url });
  }
}

function GET_products_new(req, res) {
  const keys = ['name', 'price', 'inventory'];
  res.render('new', { title: 'Product', path: 'products', keys });
}

function GET_products(req, res) {
  AllProducts.getAllProducts().then(data => {
    const productKeys = Object.keys(data[0]);
    res.render('index', {
      title: 'product',
      path: 'products',
      keys: productKeys,
      data: data
    });
  });
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
