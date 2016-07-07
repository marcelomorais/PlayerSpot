import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from '../mixins/StoreMixin'

const changeEvent = 'change';

var _store = [];

var BasicDataStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(changeEvent, callback);
  },

  emitChange: function (callback) {
    this.emit(changeEvent);
  },

  getAllStreams: ()=> _store.streams,

  getStreamByName: (name)=> _.find(_store.streams, {name: name}),

  getAllTopRatedArticles: ()=> _.filter(_store.articles, x=> x.best),

  getLastArticles: ()=> _.filter(_store.articles, x=> !x.best),

  getGames: ()=> _store.games,

  getError: ()=> _store.error

});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.INITIALIZE:
      _store.articles = action.articles || _store.articles;
      _store.streams = action.streams || _store.streams;
      _store.games = action.games || _store.games;
      BasicDataStore.emitChange();
      break;
    default:
  }
});

export default BasicDataStore;
