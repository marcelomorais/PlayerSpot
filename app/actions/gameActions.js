import Disptacher from '../dispatcher/appDispatcher'
import ActionTypes from '../constants/ActionTypes'
import {GameAPI} from './apiInterface'

const gameActions = {
  getGameById: function (id) {
    GameAPI.getGameById(id).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.GAME_GET,
        game: response.game
      });
    });
  },

  getGames: function (game, max, offset, competitive) {
    GameAPI.getGames(game, max, offset, competitive).then((response)=> {
      Disptacher.dispatch({
        actionType: ActionTypes.GAME_GET,
        games: response.games,
        count: response.count
      });
    });
  }
};

export default gameActions;
