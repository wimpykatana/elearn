const _ = require("underscore");

function sum(arr) {
    // returns the sum total of all values in the array
    return _.reduce(arr, function(memo, num) { return memo + num}, 0);
}

export function countRatings(arr){
    // create new array
    let newArr = [];
    if(arr) {
      for(let i = 0; i < arr.length ; i++ ) {
        if(arr[i].userHasRate) {
          newArr.push(arr[i].ratings)
        }
      }
    }
    
    var length = newArr.length;
    const arrsum = sum(newArr);
    var valratings = (newArr.length <= 0 ? 0 : arrsum / length);

    return valratings;

}
