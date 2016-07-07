import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from './../mixins/StoreMixin'

const changeEvent = 'change';

let _store = {};


let AdminStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(changeEvent, callback);
  },

  emitChange(callback) {
    this.emit(changeEvent);
  },

  getArticle() {
    return _store.article
  },

  getGame() {
    return _store.game
  },

  getError(){
    return _store.error;
  }
});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.ARTICLE_SAVE:
      if (action.article)
        _store.article = action.article;
        _store.error = action.error;
      AdminStore.emitChange();
      break;
    case ActionTypes.GAME_SAVE:
      if (action.game)
        _store.game = action.game;
      _store.error = action.error;
      AdminStore.emitChange();
      break;
    case ActionTypes.STREAMER_SAVE:
      if (action.game)
        _store.streamer = action.streamer;
      _store.error = action.error;
      AdminStore.emitChange();
      break;
    default:
  }
});

export default AdminStore;
