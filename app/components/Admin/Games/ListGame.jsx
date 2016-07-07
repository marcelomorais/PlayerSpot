import React, { Component } from 'react';
import AdminActions from '../../../actions/adminActions';
import GameActions from '../../../actions/gameActions';
import GameStore from '../../../stores/gameStore';
import {LinkWithState} from '../../../mixins/LinkedStateMixin';
import moment from 'moment';
import PagedList from '../../Common/PagedList';

class ListGame extends Component {

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
    this.changeListener = this.onChange.bind(this);
    GameStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    GameStore.removeChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      games: GameStore.getGames(),
      count: GameStore.getGamesCount(),
    });
  }

  submit(event) {
    event.preventDefault();
    GameActions.getGames(this.state.game, this.props.listMax);
  }

  addNew(event) {
    event.preventDefault();
    let EditGame = this.props.editGameComp;
    this.props.setRightComponent(<EditGame action="create" selectTab={this.props.selectTab}
      tabId={this.props.tabId}/>);
  }

  renderGames(game) {
    return (<li className="item" key={game._id}>
      <span onClick={this.editGame.bind(this, game._id)} className="podcast-li-nr">
        {game.name}
      </span>
      <span><a onClick={this.removeGame.bind(this, game._id)}>X</a></span>
    </li>);
  }

  changePage(page) {
    this.setState({
      currentPage: page,
    });
    GameActions.getGames(this.state.game, this.props.listMax,
      this.props.listMax * (page - 1));
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
            count={this.state.count} listMax={this.props.listMax}
            renderData={this.renderGames.bind(this)} pageCallback={this.changePage.bind(this)}/>
        </div>
      </div>
    );
  }

}

export default ListGame;
