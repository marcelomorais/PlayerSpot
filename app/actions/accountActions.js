import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {AccountAPI} from './apiInterface'
import _ from 'lodash'
import AccountStore from '../stores/accountStore'

var AccountActions = {
  register: function (account) {
    AccountAPI.register(account).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ACC_LOGIN,
        user: response.user,
        message: response.message,
        error: response.error,
        token: response.token,
        admin: response.admin,
        profile: response.profile
      });
    });
  },

  login: function (account) {
    AccountAPI.login(account).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ACC_LOGIN,
        user: response.user,
        error: response.error,
        message: response.message,
        token: response.token,
        admin: response.admin,
        profile: response.profile
      });
    });
  },

  externalLogin: function (code) {
    AccountAPI.externalLogin(code).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ACC_LOGIN,
        user: response.user,
        error: response.error,
        message: response.message,
        token: response.token,
        admin: response.admin,
        profile: response.profile
      });
    });
  },

  logout: function () {
    AccountAPI.logout(AccountStore.getToken()).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.ACC_LOGOUT,
        user: response.user,
        error: response.error,
        message: response.message,
        token: response.token
      });
    });
  }
};

export default AccountActions;
