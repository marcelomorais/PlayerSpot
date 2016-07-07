import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {AdminAPI} from './apiInterface'
import _ from 'lodash'
import AccountStore from '../stores/accountStore'

var AccountActions = {
  saveArticle(article) {
    AdminAPI.saveArticle(AccountStore.getToken(),article).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_SAVE,
        error: response.error,
        article: response.article
      });
    });
  },

  createArticle(article) {
    AdminAPI.createArticle(AccountStore.getToken(),article).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_SAVE,
        error: response.error,
        article: response.article
      });
    });
  },

  deleteArticle(id) {
    AdminAPI.deleteArticle(AccountStore.getToken(),id).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_DELETE,
        error: response.error,
        article: response.article
      });
    });
  },

  deleteGame(id) {
    AdminAPI.deleteGame(AccountStore.getToken(),id).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.GAME_DELETE,
        error: response.error,
        game: response.game
      });
    });
  },

  saveGame(game) {
    AdminAPI.saveGame(AccountStore.getToken(),game).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.GAME_SAVE,
        error: response.error,
        article: response.article
      });
    });
  },

  createGame(game) {
    AdminAPI.createGame(AccountStore.getToken(),game).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.GAME_SAVE,
        error: response.error,
        game: response.game
      });
    });
  },

  createStreamer(streamer) {
    AdminAPI.createStreamer(AccountStore.getToken(),streamer).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.STREAMER_SAVE,
        error: response.error,
        streamer: response.streamer
      });
    });
  },

  changeBanUser(user, ban) {
    AdminAPI.changeBanUser(AccountStore.getToken(),user,ban).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.PROFILE_SAVE,
        error: response.error,
        profile: response.profile
      });
    });
  }
};

export default AccountActions;
