class AllProducts {
  constructor() {
    this.storage = [];
  }

  addProduct(product) {
    if (product instanceof Product) {
      this.storage.push(product);
      return true;
    } else {
      throw new Error('Add Valid Product to Products');
    }
  }

  getAllProducts() {
    return this.storage;
  }
}

class Product {
  constructor(name, price, inventory) {
    this.name = name;
    this.price = price;
    this.inventory = inventory;
  }

  getProduct() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getInventory() {
    return this.inventory;
  }

  changeName(newName) {
    this.name = name;
    return true;
  }

  changePrice(newPrice) {
    newPrice = Number(newPrice);
    if (newPrice >= 0) {
      this.price = newPrice;
      return true;
    } else {
      throw new Error('Price Input is Invalid');
    }
  }

  changeInventory(num) {
    newPrice = Number(newPrice);
    if (newPrice >= 0) {
      this.price = newPrice;
      return true;
    } else {
      throw new Error('Inventory Input is Invalid');
    }
  }
}

module.exports = {
  Product,
  AllProducts
};
