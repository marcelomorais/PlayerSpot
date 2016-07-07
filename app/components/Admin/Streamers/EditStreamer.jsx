import React, { Component } from 'react';
import jsxToString from 'jsx-to-string';
import AdminActions from '../../../actions/adminActions';
import StreamerStore from '../../../stores/streamStore';
import StreamerActions from '../../../actions/streamActions';
import AdminStore from '../../../stores/adminStore';
import LinkState, {LinkWithState} from '../../../mixins/LinkedStateMixin';
import _ from 'lodash';
import PagedList from '../../Common/PagedList';

class EditStreamer extends Component {

  static propTypes = {};

  static defaultProps = {
    action: 'edit',
  };

  constructor(props) {
    super(props);
    if (this.props.streamerId)
      StreamerActions.getStreamerById(this.props.streamerId);
    this.state = {
      streamer: {
        characters: [],
      },
      currentPage: 0,
      character: {},
    };
  }

  submit(event) {
    event.preventDefault();
    console.log(this.state.streamer);
    if (this.props.action == 'edit')
      StreamerActions.saveStreamer(this.state.streamer);
    else
      AdminActions.createStreamer(this.state.streamer);
  }

  addCharacter(event) {
    event.preventDefault();
    let streamer = this.state.streamer;
    streamer.characters.push(this.state.character);
    console.log(streamer);
    this.setState({
      streamer,
      character: { game: '', name: '' },
    });
  }

  componentWillMount() {
    this.saveListener = this.onSave.bind(this);
    this.loadListener = this.onLoad.bind(this);
    AdminStore.addChangeListener(this.saveListener);
    StreamerStore.addChangeListener(this.loadListener);
  }

  componentWillUnmount() {
    AdminStore.removeChangeListener(this.saveListener);
    StreamerStore.removeChangeListener(this.loadListener);
  }

  renderCharacters(character, i) {
    return (<li className="item" key={i}>
      <span className="podcast-li-nr">{character.name}</span>
      <span className="podcast-li-nr">{character.game}</span>
    </li>);
  }

  onSave() {
    this.setState({
      streamer: StreamerStore.getStreamer(),
    });
    if (!AdminStore.getError())
      this.props.selectTab(this.props.tabId);

  }

  onLoad() {
    this.setState({
      streamer: StreamerStore.getStreamer(),
    });

  }

  pageCallback() {

  }

  renderGames() {
    return this.props.games.map(game=> {
      return <option value={game.tag}>{game.name}</option>;
    });
  }

  render() {
    return (
      <div key={this.props.action}>
        <div>
          <div className="admin-article-left">
            <div className="admin-article">
              <span className="first">Nome:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['streamer', 'name'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Plataforma:</span>
              <select type="text"
                valueLink={LinkWithState.call(this, ['streamer', 'platform'])} defaultValue=''>
                <option value="">Selecione um tipo</option>
                <option value="twitch">TwitchTv</option>
                <option value="azubu">AzubuTv</option>
              </select>
            </div>
          </div>
          <div className="admin-article-left">
            <div className="admin-article">
              <span className="first">Url:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['streamer', 'url'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Canal:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['streamer', 'channel'])}/>
            </div>

          </div>

          <h3 className="admin-description">Personagens:</h3>
          <div className="admin-article-left" style={{ width: '100%' }}>
            <div className="admin-article">
              <span className="first">Nome:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['character', 'name'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Região:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['character', 'region'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Jogo:</span>
              <select type="text" valueLink={LinkWithState.call(this, ['character', 'game'])}
                defaultValue=''>
                <option value=''>Selecione um jogo</option>
                {this.renderGames()}
              </select>
            </div>
          </div>

          <div style={{ width:100, marginLeft: 45 }}>
            <input type="submit" value="Adicionar" onClick={this.addCharacter.bind(this)}
                   style={{ marginTop: 20, float: 'left' }}/>
          </div>

          {this.state.streamer.characters ?
          <PagedList data={this.state.streamer.characters} currentPage={this.state.currentPage}
                     count={this.state.streamer.characters.length}
                     listMax={100} pageCallback={this.pageCallback}
                     renderData={this.renderCharacters.bind(this)} editable={true}/> : null}

          <input type="submit" value="Salvar" onClick={this.submit.bind(this)}
                 style={{ marginTop: 20, float: 'left' }}/>
        </div>
      </div>
    );
  }

}

export default EditStreamer;
