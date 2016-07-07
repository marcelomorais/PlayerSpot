import _ from 'lodash';

var mergeStore = (store, newValue, omits)=> {
  var newStore = _.assign(store, newValue);
  return newValue.error ? newStore : _.omit(newStore, omits);
};

var updateStore = (store, newValue, omits)=> {
  var newStore = _.assign(store, newValue);
  return newValue.error ? newStore : _.omit(newStore, omits);
};


export {mergeStore as mergeStore}
