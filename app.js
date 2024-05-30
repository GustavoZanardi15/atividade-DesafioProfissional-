const express = require('express');
const bodyParser = require('body-parser');
const valueMultiplier = require('./middlewares/valueMultiplier');
const { createProduct, getProduct, updateProduct, deleteProduct } = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

app.post('/products', valueMultiplier, createProduct);
app.get('/products/:id', getProduct);
app.put('/products/:id', valueMultiplier, updateProduct);
app.delete('/products/:id', deleteProduct);

app.use((err, req, res, next) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

module.exports = app;
