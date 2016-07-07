import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {StreamAPI, ArticleAPI, GameAPI} from './apiInterface'
import _ from 'lodash'

var InitializeActions = {
  getStreams: function () {
    StreamAPI.getStreams('pt-br').then((responseBR)=> {
      StreamAPI.getStreams('pt').then((responsePT)=> {
        let streamsPT = responsePT.streams.map((s)=> {
          s.country = 'PT';
          return s;
        });
        let streamsBR = responseBR.streams.map((s)=> {
          s.country = 'BR';
          return s;
        });
        Disptacher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          streams: _.sortBy(streamsPT.concat(streamsBR).map(x=> { x.viewers = +x.viewers; return x}), 'viewers').reverse(),
        });
      });
    });
  },
  getArticles: function (game) {
    ArticleAPI.getArticles(null, game, null, null, null, false).then(articlesReponse => {
      Disptacher.dispatch({
        actionType: ActionTypes.INITIALIZE,
        articles: articlesReponse.articles
      });
    });
  },

  getGames: function () {
    GameAPI.getGames().then(gamesResponse => {
      Disptacher.dispatch({
        actionType: ActionTypes.INITIALIZE,
        games: gamesResponse.games
      });
    });
  },

  initApp: function (game) {
    this.getStreams();
    //this.getArticles(game);
    //this.getGames();
  }
};

export default InitializeActions;
