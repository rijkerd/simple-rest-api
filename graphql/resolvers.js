'use strict';

const Product = require('../Product/product.model');
const _ = require('lodash');

module.exports = {
  createProduct: async ({ productInput }) => {
    const options = _.pick(productInput, ['name', 'price']);
    const product = new Product(options);
    const createdProduct = await product.save();
    return {
      ...createdProduct._doc,
      _id: createdProduct._id.toString(),
    };
  },
  products: async function () {
    const products = await Product.find();
    return {
      products: products.map((q) => {
        return {
          ...q._doc,
          _id: q._id.toString(),
        };
      }),
    };
  },

  updateProduct: async function ({ id, productInput }) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product Not found!');
    }

    product.name = productInput.name;
    product.description = productInput.description;
    product.price = productInput.price;
    product.discount = productInput.discount;
    const updatedProduct = await product.save();
    return {
      ...updatedProduct._doc,
      _id: updatedProduct._id.toString(),
    };
  },

  deleteProduct: async function ({ id, productInput }) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product Not found!');
    }
    await Product.findByIdAndRemove(id);
    return {
      ...product._doc,
      id: product._id.toString(),
    };
  },
};
