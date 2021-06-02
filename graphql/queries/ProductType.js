'use strict';

const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  description: 'This represent an product',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    shop: { type: GraphQLString },
  }),
});

module.exports = ProductType;
