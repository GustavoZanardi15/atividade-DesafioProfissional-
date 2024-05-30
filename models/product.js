const products = [];

class Product {
  constructor(id, name, value, quantity) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.quantity = quantity;
  }
}

module.exports = { Product, products };
