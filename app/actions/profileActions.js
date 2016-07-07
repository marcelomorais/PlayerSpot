import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {ProfileAPI} from './apiInterface'
import _ from 'lodash'
import AccountStore from '../stores/accountStore'

var ProfileActions = {
  getProfile: function (user,admin, max, offset) {
    ProfileAPI.getProfile(user,admin, max, offset).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.PROFILE_GET,
        profiles: response.profiles,
        profile: response.profile,
        count: response.count,
        error: response.error
      });
    });
  },

  getArticleById: function (id) {
    ProfileAPI.getProfileById(id).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ARTICLE_GET,
        profile: response.profile
      });
    });
  },

  saveProfile: function (profile) {
    ProfileAPI.saveProfile(AccountStore.getToken(), profile).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.PROFILE_SAVE,
        profile: response.profile,
        error: response.error
      });
    });
  }
};

export default ProfileActions;
