import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {EventEmitter}  from 'events'
import assign from 'object-assign'
import _ from 'lodash'
import {mergeStore} from './../mixins/StoreMixin'

const changeEvent = 'change';

let _store = {};
_store.currentProfile = JSON.parse(localStorage.getItem('profile'));

let ProfileStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(changeEvent, callback);
  },

  emitChange(callback) {
    this.emit(changeEvent);
  },

  getError() {
    return _store.error;
  },

  getProfile() {
    return _store.profile
  },

  getProfiles: ()=> _store.profiles,

  getProfilesCount: ()=> _store.profilesCount,

});

Disptacher.register((action)=> {
  switch (action.actionType) {
    case ActionTypes.ACC_LOGIN:
      _store.currentProfile = action.profile;
      if (_store.currentProfile) {
        localStorage.setItem('profile', JSON.stringify(_store.currentProfile));
      }
      ProfileStore.emitChange();
      break;
    case ActionTypes.ACC_LOGOUT:
      if (action.success) {
        localStorage.removeItem('profile');
        ProfileStore.emitChange();
      }
      break;
    case ActionTypes.PROFILE_GET:
      _store = mergeStore(_store, {
        profiles: action.profiles,
        profile: action.profile,
        error: action.error,
        profilesCount: action.count
      });
      ProfileStore.emitChange();
      break;
    case ActionTypes.PROFILE_SAVE:
      _store = mergeStore(_store, {
        profile: action.profile,
        error: action.error,
        currentProfile: action.profile.user == _store.currentProfile.user ? action.profile : _store.currentProfile
      });
      localStorage.setItem('profile', JSON.stringify(_store.currentProfile));
      ProfileStore.emitChange();
      break;
    default:
  }
});

export default ProfileStore;
