import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from '../mixins/StoreMixin'

const changeEvent = 'change';

var _store = [];

var ArticleStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(changeEvent, callback);
  },

  emitChange: function (callback) {
    this.emit(changeEvent);
  },

  getArticles: ()=> _store.articles,

  getArticlesCount: ()=> _store.articlesCount,

  getAllTopRatedArticles: ()=> _.filter(_store.articles, x=> x.best),

  getLastArticles: ()=> _.filter(_store.articles, x=> !x.best),

  getError: ()=> _store.error,

  getArticle: ()=> _store.article

});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.ARTICLE_GET:
      _store = mergeStore(_store, {
        articles: action.articles,
        article: action.article,
        error: action.error,
        articlesCount: action.count
      });
      ArticleStore.emitChange();
      break;
    default:
  }
});

export default ArticleStore;
