
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
    console.log('filteredPosts', filteredPosts);
    
    const { price, category, country, state, sortBy } = filteredPosts;

    var findQuery= {} ;

      if(price)
         findQuery.price= { $gt: price[0], $lt: price[1] }   
         
      if(category)
         findQuery["category.category"]=  category 
     
      if(country && state)
         findQuery.locations= {
              $elemMatch: {
               country,
                states:  state ? { $elemMatch: { state } } : { $elemMatch: {  } }
               }
            } 
     else if(country)
         findQuery.locations= {
              $elemMatch: {
                country
               }
            } 
     else if(state)
         findQuery.locations= {
              $elemMatch: {              
                states:  state ? { $elemMatch: { state } } : { $elemMatch: {  } }
               }
            } 
              
    
   
    console.log('CATEGORY: ' + price + category + country + state)
    
    console.log("findquery", findQuery)
   
    this.query = this.query.find({...findQuery})

  //   var sortedPosts
  //   if(sortBy){
  //     sortedPosts = [...this.query];
  //    if (sortBy === 'newest') {
  //      sortedPosts.sort((a, b) => {
  //        return moment(b.createdAt).diff(moment(a.createdAt));
  //      });
  //    } else if (sortBy === 'oldest') {
  //      sortedPosts.sort((a, b) => {
  //        return moment(a.createdAt).diff(moment(b.createdAt));
  //      });
  //    } else if (sortBy === 'lowest') {
  //      sortedPosts.sort((a, b) => a.price - b.price);
  //    } else if (sortBy === 'highest') {
  //      sortedPosts.sort((a, b) => b.price - a.price);
  //    }
  //  }
    
  //  console.log("sortedPosts", + sortedPosts)
    return this;
  }
}

module.exports = APIFeatures;
