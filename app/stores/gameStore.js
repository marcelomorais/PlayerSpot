import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from '../mixins/StoreMixin'

const changeEvent = 'change';

var _store = [];

var GameStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(changeEvent, callback);
  },

  emitChange: function (callback) {
    this.emit(changeEvent);
  },

  getGames: ()=> _store.games,

  getGamesCount: ()=> _store.gameCount,

  getError: ()=> _store.error,

  getGame: ()=> _store.game

});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.GAME_GET:
      _store = mergeStore(_store, {
        games: action.games,
        game: action.game,
        error: action.error,
        gameCount: action.count
      });
      GameStore.emitChange();
      break;
    default:
  }
});

export default GameStore;
