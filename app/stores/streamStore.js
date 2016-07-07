import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from '../mixins/StoreMixin'

const changeEvent = 'change';

var _store = [];

var StreamStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback, event) {
    this.on(event || changeEvent, callback);
  },

  removeChangeListener: function (callback, event) {
    this.removeListener(event || changeEvent, callback);
  },

  emitChange: function (event) {
    this.emit(event || changeEvent);
  },

  getAllStreams: ()=> _store.streams,

  getStreamByName: (name)=> _.find(_store.streams, {name: name}),

  getStreamers: ()=> _store.streamers,

  getStreamersCount: ()=> _store.streamerCount,

  getError: ()=> _store.error,

  getStreamer: ()=> _store.streamer,

  getGames: ()=> _store.games,

  getCurrentStream: ()=> {
    return {
      streamer: _store.streamer,
      stream: _store.stream,
      panel: _store.panel,
      following: _store.following,
      subscribing: _store.subscribing
    };
  },

  getCurrentGame: ()=> _store.currentGame,

  getInGameData: ()=> {
    return {
      summoner: _store.summoner,
      currentMatch: _store.currentMatch,
    };
  },
});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.STREAMS_GET:
      _store.streams = action.streams;
      StreamStore.emitChange(ActionTypes.STREAMS_GET);
      break;
    case ActionTypes.STREAMER_GET:
      _store = mergeStore(_store, {
        streamers: action.streamers,
        streamer: action.streamer,
        stream: action.stream,
        panel: action.panel,
        following: action.following,
        subscribing: action.subscribing,
        error: action.error,
        streamerCount: action.count
      });
      StreamStore.emitChange(ActionTypes.STREAMER_GET);
      break;
    case ActionTypes.STREAMER_INGAME:
      _store = mergeStore(_store, {
        summoner: action.summoner,
        currentMatch: action.currentMatch
      });
      StreamStore.emitChange(ActionTypes.STREAMER_INGAME);
      break;
    case ActionTypes.STREAMER_FOLLOW:
      if (!action.error)
        _store = mergeStore(_store, {
          error: action.error
        });
      StreamStore.emitChange(ActionTypes.STREAMER_FOLLOW);
      break;
    case ActionTypes.STREAM_GAMES_GET:
      _store = mergeStore(_store, {
        games: action.games
      });
      StreamStore.emitChange(ActionTypes.STREAM_GAMES_GET);
      break;
    default:
  }
});

export default StreamStore;
