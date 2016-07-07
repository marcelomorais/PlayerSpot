import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from './../mixins/StoreMixin'

const changeEvent = 'change';

let _store = {};
_store.token = localStorage.getItem('token');
_store.user = localStorage.getItem('user');
_store.admin = +localStorage.getItem('admin');


let AccountStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(changeEvent, callback);
  },

  emitChange(callback) {
    this.emit(changeEvent);
  },

  getUser() {
    return _store.user
  },

  getError() {
    return _store.error;
  },

  getToken() {
    return _store.token
  },

  getAdmin() {
    return _store.admin
  }

});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.ACC_LOGIN:
      _store = mergeStore(_store, {
        token: action.token,
        user: action.user,
        error: action.error,
        admin: action.admin ? +action.admin.type : null
      });
      if (_store.token && _store.user) {
        localStorage.setItem('token', _store.token);
        localStorage.setItem('user', _store.user);
        localStorage.setItem('admin', _store.admin);
      }
      AccountStore.emitChange();
      break;
    case ActionTypes.ACC_LOGOUT:
      if (!action.success) {
        _store = {};
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        AccountStore.emitChange();
      }
      break;
    default:
  }
});

export default AccountStore;
