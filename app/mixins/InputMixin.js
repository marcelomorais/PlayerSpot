import _ from 'lodash';

var handleFile= function(callback, e) {
  var reader = new FileReader();
  var file = e.target.files[0];

  reader.onload = function (upload) {
    callback.call(this,upload);
  }.bind(this);

  reader.readAsDataURL(file);
};

var updateStore = (store, newValue, omits)=> {
  var newStore = _.assign(store, newValue);
  return newValue.error ? newStore : _.omit(newStore, omits);
};


export {handleFile as handleFile}
