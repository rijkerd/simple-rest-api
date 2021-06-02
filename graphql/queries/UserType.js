'use strict';

const { GraphQLString, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const Shop = require('../../Shop/shop.model');
const ShopType = require('../queries/ShopType');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'This represent an user',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    profileImage: { type: GraphQLString },
    shop: {
      type: ShopType,
      resolve: async function (user) {
        var shops = await Shop.findById(user._id);

        if (!shops) {
          throw new Error('Error');
        }

        return shops;
      },
    },
  }),
});

module.exports = UserType;
