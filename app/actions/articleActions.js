import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {StreamAPI, ArticleAPI} from './apiInterface'

const articleActions = {
  getArticleById: function (id) {
    ArticleAPI.getArticleById(id).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_GET,
        article: response.article
      });
    });
  },

  getArticleByUrl: function (shortUrl) {
    ArticleAPI.getArticleByUrl(shortUrl).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_GET,
        article: response.article
      });
    });
  },

  getArticles: function (title, game, date, max, offset) {
    ArticleAPI.getArticles(title, game, date, max, offset).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_GET,
        articles: response.articles,
        count: response.count
      });
    });
  }
};

export default articleActions;
