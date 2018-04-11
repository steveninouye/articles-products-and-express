const { host, user, password, database } = require('./config/config');
let AllProducts = {};
AllProducts.storage = [];

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: host,
    user: user,
    password: password,
    database: database
  }
});

AllProducts.addProduct = (name, price, inventory) => {
  return knex('products').insert({
    name: name,
    price: price,
    inventory: inventory
  });
};

AllProducts.getAllProducts = () => {
  return knex.select().from('products');
};

AllProducts.searchForProduct = id => {
  return knex
    .select()
    .where({ product_id: id })
    .from('products');
};

AllProducts.deleteProduct = id => {
  if (id) {
    return knex('products')
      .where('product_id', id)
      .del();
  } else {
    return false;
  }
};

AllProducts.editProduct = (id, name, price, inventory) => {
  name = name.trim();
  price = parseInt(Number(price.trim()) * 100) / 100;
  inventory = parseInt(inventory.trim());
  if (id && name && price && inventory) {
    return knex('products')
      .where('product_id', id)
      .update({ name: name, price: price, inventory: inventory });
  } else {
    return false;
  }
};

module.exports = {
  AllProducts
};
