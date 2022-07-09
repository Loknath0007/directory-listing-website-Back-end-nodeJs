const { Db } = require('mongodb');
const checkLogin = require('../middlewares/checkLogin');

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.filteredPosts = JSON.parse(queryStr.filteredPosts);
  }

  search() {
    const postTitle = this.queryStr.title
      ? {
          title: {
            $regex: this.queryStr.title,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...postTitle });
    return this;
  }

  filter() {
    const filteredPosts = this.filteredPosts;
    // const price = {price:{$gt:100, $lt:1000}}
    console.log('filteredPosts', filteredPosts);
    // this.query = this.query.find({
    //   $or: [{ brand: 'Toyota' }, { price: { $gt: 100, $lt: 1000 } }],
    // });
    const { price, category, country, state } = filteredPosts;
    console.log('CATEGORY: ' + country);
    this.query = this.query.find({
      price: { $gt: price[0], $lt: price[1] },
      'category.category': category,
      locations: {
        $elemMatch: {
          country,
          states: { $elemMatch: { state } },
        },
      },

      // $and: [
      //   { category: filteredPosts.category },
      //   { price: { $gt: price[0], $lt: price[1] } },
      // { country: country || 'all' },
      // { state: state || 'all' },
      // ],
    });
    return this;
  }
}

module.exports = APIFeatures;
