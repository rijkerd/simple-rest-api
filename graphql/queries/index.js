'use strict';

const { GraphQLList, GraphQLObjectType } = require('graphql');
const ShopType = require('./ShopType');
const ProductType = require('./ProductType');
const UserType = require('./UserType');
const Shop = require('../../Shop/shop.model');
const Product = require('../../Product/product.model');
const User = require('../../User/user.model');

const RootQueryType = new GraphQLObjectType({
  name: 'AppSchema',
  description: 'Application Schema Query Root',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: 'List of all users',
      resolve: async function () {
        return await User.find({}, (err, auth) => {});
      },
    },
    shops: {
      type: new GraphQLList(ShopType),
      description: 'List of all shops',
      resolve: async function () {
        var shops = await Shop.find({});
        return shops;
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      description: 'List all products',
      resolve: async function () {
        var products = await Product.find({});
        return products;
      },
    },
  }),
});

module.exports = RootQueryType;
