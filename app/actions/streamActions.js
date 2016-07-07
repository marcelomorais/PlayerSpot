import Disptacher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/ActionTypes';
import {StreamAPI} from './apiInterface';
import AccountStore from '../stores/accountStore';
import _ from 'lodash';

var StreamActions = {

  searchGames: function (game) {
    StreamAPI.searchGames(game).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAM_GAMES_GET,
        games: response.games
      });
    });
  },

  getStreams: function (name, language, game, limit, offset) {
    if (language == 'pt-br') {
      this.getBrStream(name, game, limit, offset);
    }
    else {
      StreamAPI.getStreams(language, game, limit, offset, name).then((response)=> {
        Disptacher.dispatch({
          actionType: ActionTypes.STREAMS_GET,
          streams: _.sortBy(response.streams.map(x=> { x.viewers = +x.viewers; return x}), 'viewers').reverse()
        });
      });
    }
  },

  getBrStream: function (name, game, limit, offset) {
    StreamAPI.getStreams('pt-br', game, limit, offset, name).then((responseBR)=> {
      StreamAPI.getStreams('pt', game, limit, offset, name).then((responsePT)=> {
        let streamsPT = responsePT.streams.map((s)=> {
          s.country = 'PT';
          return s;
        });
        let streamsBR = responseBR.streams.map((s)=> {
          s.country = 'BR';
          return s;
        });
        Disptacher.dispatch({
          actionType: ActionTypes.STREAMS_GET,
          streams: _.take(_.sortBy(streamsPT.concat(streamsBR).map(x=> { x.viewers = +x.viewers; return x}), 'viewers').reverse(), limit || 10)
        });
      });
    });
  },

  getStreamerData: function (streamer) {
    StreamAPI.getStreamerData(AccountStore.getToken(), streamer).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_GET,
        streamer: response.streamer,
        following: response.following,
        subscribing: response.subscribing,
        panel: response.panel,
        stream: response.stream
      });
    });
  },

  getStreamers: function (streamer, max, offset) {
    StreamAPI.getStreamers(streamer, max, offset).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_GET,
        streamers: response.streamers,
        count: response.count
      });
    });
  },

  getStreamerById: function (id) {
    StreamAPI.getStreamerById(id).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_GET,
        streamer: response.streamer,
      });
    });
  },

  saveStreamer(streamer) {
    StreamAPI.saveStreamer(AccountStore.getToken(), streamer).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_SAVE,
        error: response.error,
        streamer: response.streamer
      });
    });
  },

  getInGameData(streamer, game) {
    StreamAPI.getInGameData(streamer, game).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_INGAME,
        summoner: response.summoner,
        currentMatch: response.currentMatch
      });
    });
  },

  followChannel(channel) {
    StreamAPI.followChannel(channel, AccountStore.getToken()).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_FOLLOW,
        error: response.error
      });
    });
  },
};

export default StreamActions;
