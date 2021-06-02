'use strict';

const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const Shop = require('../../Shop/shop.model');
const ShopType = require('../queries/ShopType');

const ShopType = new GraphQLObjectType({
  name: 'ShopType',
  description: 'This represent an Shop',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    owner: { type: GraphQLString },
    products: {
      type: ShopType,
      resolve: async function (shop) {
        var product = await Shop.findById(shop._id);
        if (!product) {
          throw new Error('Error');
        }
        return product;
      },
    },
  }),
});

module.exports = ShopType;
