import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import request from 'request-promise'
import {twitchID, host} from '../config'

const streamAPIUrl = host + 'Api/TwitchTv/';
const userAPIUrl = host + '/api/account/';
const adminAPIUrl = host + '/api/admin/';
const articleAPIUrl = host + '/api/article/';
const profileAPIUrl = host + '/api/profile/';
const gameAPIUrl = host + '/api/game/';
const playerSpotAPIUrl = host + 'Api/PlayerSpotLoL/';

function getBaseOptions(url, method, body, qs) {
  return {
    url,
    method,
    json: true,
    body,
    qs
  }
};
const StreamAPI = {
  searchGames: function (game) {
    let urlTwitch = 'https://api.twitch.tv/kraken/search/games/';
    return request(getBaseOptions(urlTwitch, 'GET', {}, {q:game,type: 'suggest'}));
  },

  getStreams: function (language, game, limit, offset, name) {
    var url = streamAPIUrl + 'GetStreams';
    return request(getBaseOptions(url, 'GET', {}, {game, language, limit, offset, name}));
  },

  getStreamerData: function (token, name) {
    var url = streamAPIUrl + 'GetStreamer';
    return request(getBaseOptions(url, 'GET', {}, {name}));
  },

  getStreamers: function (name, streamer, max, offset) {
    let url = streamAPIUrl + 'streamer';
    return request(getBaseOptions(url, 'GET', {}, {streamer, max, offset}));
  },

  getStreamerById: function (id) {
    let url = streamAPIUrl + 'streamer';
    return request(getBaseOptions(url, 'GET', {}, {id}));
  },

  saveStreamer: function (token, streamer) {
    let url = streamAPIUrl + 'saveStreamer';
    return request(getBaseOptions(url, 'POST', {streamer, token}));
  },

  getInGameData: function (streamer, game) {
    let url = playerSpotAPIUrl + 'GetUserAndDataByChannel';
    return request(getBaseOptions(url, 'GET', {}, {streamName: streamer, gameName : game}));
  },

  followChannel: function (channel, token) {
    let url = streamAPIUrl + 'followChannel';
    return request(getBaseOptions(url, 'POST', {channel, token}));
  }
};

const AccountAPI = {

  register: function (account) {
    let url = userAPIUrl + 'register';
    return request(getBaseOptions(url, 'POST', {account}));
  },

  externalLogin: function (code) {
    let url = userAPIUrl + 'externalLogin',
      internal = true;
    return request(getBaseOptions(url, 'GET', {}, {code, internal}
    ));
  },

  login: function (account) {
    let url = userAPIUrl + 'login';
    return request(getBaseOptions(url, 'POST', {account}));
  },

  logout: function (token) {
    let url = userAPIUrl + 'logout';
    return request(getBaseOptions(url, 'GET', {}, {token}));
  }
};

const AdminAPI = {
  saveArticle: function (token, article) {
    let url = adminAPIUrl + 'saveArticle';
    return request(getBaseOptions(url, 'POST', {article, token}));
  },
  createArticle: function (token, article) {
    let url = adminAPIUrl + 'createArticle';
    return request(getBaseOptions(url, 'POST', {article, token}));
  },
  deleteArticle: function (token, id) {
    let url = adminAPIUrl + 'deleteArticle';
    return request(getBaseOptions(url, 'POST', {id, token}));
  },
  saveGame: function (token, game) {
    let url = adminAPIUrl + 'saveGame';
    return request(getBaseOptions(url, 'POST', {game, token}));
  },
  createGame: function (token, game) {
    let url = adminAPIUrl + 'createGame';
    return request(getBaseOptions(url, 'POST', {game, token}));
  },
  deleteGame: function (token, id) {
    let url = adminAPIUrl + 'deleteGame';
    return request(getBaseOptions(url, 'POST', {id, token}));
  },
  createStreamer: function (token, streamer) {
    let url = adminAPIUrl + 'createStreamer';
    return request(getBaseOptions(url, 'POST', {streamer, token}));
  },
  changeBanUser: function (token, user, ban) {
    let url = adminAPIUrl + 'changeBanUser';
    return request(getBaseOptions(url, 'POST', {user, token, ban}));
  },
};

const ArticleAPI = {
  getArticles: function (title, game, date, max, offset, draft) {
    return request(getBaseOptions(articleAPIUrl, 'GET', {}, {game, title, date, max, offset, draft}));
  },

  getArticleById: function (id) {
    return request(getBaseOptions(articleAPIUrl, 'GET', {}, {id}));
  },

  getArticleByUrl: function (shortUrl) {
    let url = articleAPIUrl + "byUrl";
    return request(getBaseOptions(url, 'GET', {}, {shortUrl}))
  }
};

const ProfileAPI = {
  getProfile: function (user, admin, max, offset) {
    return request(getBaseOptions(profileAPIUrl, 'GET', {}, {user, admin, max, offset}));
  },

  getProfileById: function (id) {
    return request(getBaseOptions(profileAPIUrl, 'GET', {}, {id}));
  },

  saveProfile: function (token, profile) {
    let url = profileAPIUrl + 'save';
    return request(getBaseOptions(url, 'POST', {profile, token}));
  }
};

const GameAPI = {
  getGames: function (game, max, offset, competitive) {
    return request(getBaseOptions(gameAPIUrl, 'GET', {}, {game, max, offset, competitive}));
  },

  getGameById: function (id) {
    return request(getBaseOptions(gameAPIUrl, 'GET', {}, {id}));
  }
};

export {StreamAPI as StreamAPI, AccountAPI as AccountAPI, AdminAPI as AdminAPI, ArticleAPI as ArticleAPI, ProfileAPI as ProfileAPI, GameAPI as GameAPI}
