let id = new Date().getTime();

class _AllProducts {
  constructor() {
    this.storage = [];
  }

  addProduct(product) {
    if (product instanceof Product) {
      this.storage.push(product);
      return true;
    } else {
      return false;
    }
  }

  getAllProducts() {
    return this.storage;
  }

  getAllProductID() {
    return this.storage.reduce((a, c) => {
      a.push(c.id);
      return a;
    }, []);
  }

  getIndexOfProduct(id) {
    const returnValue =
      this.getAllProductID().indexOf(id) !== -1
        ? this.getAllProductID().indexOf(id)
        : false;
    return returnValue;
  }

  searchForProduct(id) {
    const returnValue =
      this.getIndexOfProduct(id) !== false
        ? this.storage[this.getIndexOfProduct(id)]
        : false;
    return returnValue;
  }

  deleteProduct(id) {
    if (this.getIndexOfProduct(id) !== false) {
      this.storage.splice(this.getIndexOfProduct(id), 1);
      return true;
    } else {
      return false;
    }
  }

  editProduct(id, name, price, inventory) {
    name = name.trim();
    price = parseInt(Number(price.trim()) * 100) / 100;
    inventory = parseInt(inventory.trim());
    if (this.getIndexOfProduct(id) !== false && name && price && inventory) {
      this.storage[this.getIndexOfProduct(id)].name = name;
      this.storage[this.getIndexOfProduct(id)].price = price;
      this.storage[this.getIndexOfProduct(id)].inventory = inventory;
      return true;
    } else {
      return false;
    }
  }
}

class Product {
  constructor(name, price, inventory) {
    this.id = id++;
    this.name = name;
    this.price = price;
    this.inventory = inventory;
  }
}

const AllProducts = new _AllProducts();

module.exports = {
  Product,
  AllProducts
};
