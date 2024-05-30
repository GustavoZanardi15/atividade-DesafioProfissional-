import { Request, Response } from 'express';
import { Product } from '../models/product';
import { NotFoundException } from '../exceptions/customExceptions';
import { validateOrReject } from 'class-validator';
import { ProductDto } from '../dtos/productDto';

let products: Product[] = [];

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productDto = new ProductDto(req.body.name, req.body.value, req.body.quantity);
    await validateOrReject(productDto);

    const product = new Product(req.body.name, req.body.value, req.body.quantity);
    products.push(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = products.find(p => p.id === productId);

  if (!product) {
    throw new NotFoundException(`Product with ID ${productId} not found`);
  }

  res.status(200).json(product);
};

export const updateProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    throw new NotFoundException(`Product with ID ${productId} not found`);
  }

  const productDto = new ProductDto(req.body.name, req.body.value, req.body.quantity);
  validateOrReject(productDto);

  products[index] = new Product(req.body.name, req.body.value, req.body.quantity);
  res.status(200).json(products[index]);
};

export const deleteProduct = (req: Request, res: Response) => {
  const productId = req.params.id;
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    throw new NotFoundException(`Product with ID ${productId} not found`);
  }

  const deletedProduct = products.splice(index, 1);
  res.status(200).json(deletedProduct);
};
