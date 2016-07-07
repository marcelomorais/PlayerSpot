import React, { Component } from 'react';
import AdminActions from '../../../actions/adminActions';
import GameStore from '../../../stores/gameStore';
import GameActions from '../../../actions/gameActions';
import AdminStore from '../../../stores/adminStore';
import LinkState, {LinkWithState} from '../../../mixins/LinkedStateMixin';
import _ from 'lodash';

class EditGame extends Component {

  static propTypes = {};

  static defaultProps = {
    action: 'edit',
  };

  constructor(props) {
    super(props);
    if (this.props.gameId)
      GameActions.getGameById(this.props.gameId);
    this.state = {
      game: {
        competitive: {},
      },
    };
  }

  submit(event) {
    event.preventDefault();
    if (this.props.action == 'edit')
      AdminActions.saveGame(this.state.game);
    else
      AdminActions.createGame(this.state.game);
  }

  componentWillMount() {
    this.saveListener = this.onSave.bind(this);
    this.loadListener = this.onLoad.bind(this);
    AdminStore.addChangeListener(this.saveListener);
    GameStore.addChangeListener(this.loadListener);
  }

  componentWillUnmount() {
    AdminStore.removeChangeListener(this.saveListener);
    GameStore.removeChangeListener(this.loadListener);
  }

  onSave() {
    this.setState({
      game: AdminStore.getGame(),
    });
    if (!AdminStore.getError())
      this.props.selectTab(this.props.tabId);

  }

  onLoad() {
    this.setState({
      game: GameStore.getGame(),
    });
  }

  updateGame(key, value) {
    var game = this.state.game;
    game[key] = value;
    return game;
  }

  handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function (upload) {
      this.setState({
        article: this.updateGame('image', upload.target.result),
      });
    }.bind(this);

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div key={this.props.action}>
        <div>
          <div className="admin-article-left">
            <div className="admin-article">
              <span className="first">Nome:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['game', 'name'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Tag:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['game', 'tag'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Url:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['game', 'url'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Tipo:</span>
              <select type="text" valueLink={LinkWithState.call(this, ['game', 'type'])}
                defaultValue=''>
                <option value="">Selecione um tipo</option>
                <option value="MMO">MMO</option>
                <option value="MOBA">MOBA</option>
                <option value="RTS">RTS</option>
                <option value="FPS">FPS</option>
              </select>
            </div>
            <div className="admin-article">
              <span className="first">Imagem:</span>
              <input type="file" onChange={this.handleFile.bind(this)}/>
            </div>
          </div>
        </div>

        <input type="submit" value="Salvar" onClick={this.submit.bind(this)}
          style={{ marginTop: 20, float:'left' }}/>
      </div>
    );
  }

}

export default EditGame;
