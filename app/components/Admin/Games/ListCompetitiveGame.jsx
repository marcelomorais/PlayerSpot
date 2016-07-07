import React, { Component } from 'react';
import AdminActions from '../../../actions/adminActions';
import GameActions from '../../../actions/gameActions';
import GameStore from '../../../stores/gameStore';
import {LinkWithState} from '../../../mixins/LinkedStateMixin';
import moment from 'moment';
import PagedList from '../../Common/PagedList';
import ActionTypes from '../../../constants/ActionTypes';

class ListCompetitiveGame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      username: '',
      admin: false,
      count: 0,
      currentPage: 1,
    };
  }

  componentWillMount() {
    this.changeListener = this.onGamesLoad.bind(this);
    GameStore.addChangeListener(this.changeListener, ActionTypes.GAME_GET);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.changeListener, ActionTypes.GAME_GET);
  }

  onGamesLoad() {
    this.setState({
      games: GameStore.getGames(),
      count: GameStore.getGamesCount(),
    });
  }

  submit(event) {
    event.preventDefault();
    GameActions.getGames(this.state.game, this.props.listMax, null, true);
  }

  addNew(event) {
    event.preventDefault();
    let EditGame = this.props.editGameComp;
    this.props.setRightComponent(<EditGame action="create"
    selectTab={this.props.selectTab} tabId={this.props.tabId}/>);
  }

  renderGames(game) {
    return (<li onClick={this.editGame.bind(this, game._id)} className="item" key={game._id}>
      <span className="podcast-li-nr">{game.name}</span>
      <span><a onClick={this.removeGame.bind(this, game._id)}>X</a></span>
    </li>);
  }

  changePage(page) {
    this.setState({
      currentPage: page,
    });
    GameActions.getGames(this.state.game, this.props.listMax,
      this.props.listMax * (page - 1), true);
  };

  removeGame(id, event) {
    event.preventDefault();
    AdminActions.deleteGame(id);
    GameActions.getGames(this.state.game, this.props.listMax,
      this.props.listMax * (this.state.currentPage - 1));
  }

  editGame(id, game) {
    event.preventDefault();
    let EditGame = this.props.editGameComp;
    this.props.setRightComponent(<EditGame gameId={id} selectTab={this.props.selectTab}
      tabId={this.props.tabId}/>);
  }

  render() {
    return (
      <div>
        <div className="topBarArticle">
          <div className="admin-article">
            <span className="first">Nome:</span>
            <input type="text" valueLink={LinkWithState.call(this, ['user'])}/>
          </div>
          { this.state.error ? <p><span className="the-error-msg"><i
            className="fa fa-warning"/>{this.state.error}</span>
          </p> : null}

          <input type="submit" value="Buscar" onClick={this.submit.bind(this)}
                 style={{ marginTop: 20, marginBottom: 20, marginRight: 20 }}/>
          <input type="submit" value="Adicionar" onClick={this.addNew.bind(this)}/>
        </div>
        <div className="content-padding">
          <PagedList data={this.state.games} currentPage={this.state.currentPage}
            count={this.state.count}
            listMax={this.props.listMax}
            renderData={this.renderGames.bind(this)} pageCallback={this.changePage.bind(this)}/>
        </div>
      </div>
    );
  }

}

export default ListCompetitiveGame;
