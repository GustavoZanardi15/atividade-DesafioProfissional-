const { Product, products } = require('../models/product');
const { NotFoundException } = require('../exceptions/customExceptions');
const { validateOrReject } = require('class-validator');
const ProductDto = require('../dtos/productDto');

let currentId = 1;

const createProduct = async (req, res, next) => {
  try {
    const productDto = new ProductDto(req.body.name, req.body.value, req.body.quantity);
    await validateOrReject(productDto);

    const product = new Product(currentId++, req.body.name, req.body.value, req.body.quantity);
    products.push(product);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const getProduct = (req, res, next) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundException('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productDto = new ProductDto(req.body.name, req.body.value, req.body.quantity);
    await validateOrReject(productDto);

    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundException('Product not found');

    product.name = req.body.name;
    product.value = req.body.value;
    product.quantity = req.body.quantity;

    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) throw new NotFoundException('Product not found');

    products.splice(index, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct };
