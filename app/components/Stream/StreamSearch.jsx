import React, { Component } from 'react';
import StreamStore from '../../stores/streamStore';
import StreamActions from '../../actions/streamActions';
import LinkState, {LinkWithState} from '../../mixins/LinkedStateMixin';
import Autocomplete from 'react-autocomplete';
import Actions from '../../constants/ActionTypes';
import StreamMixin from '../../mixins/StreamMixin';
import ListWrapper from '../../mixins/ListWrapper'

class StreamSearch extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      games: [],
      streamName: null,
      languagePt: false
    }
    this.searchStreams();
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    this.gameListener = this.gameChange.bind(this);
    StreamStore.addChangeListener(this.changeListener, Actions.STREAMS_GET);
    StreamStore.addChangeListener(this.gameListener, Actions.STREAM_GAMES_GET)
  }

  componentWillUnmount() {
    StreamStore.removeChangeListener(this.changeListener, Actions.STREAMS_GET);
    StreamStore.removeChangeListener(this.gameListener, Actions.STREAM_GAMES_GET)
  }

  gameChange() {
    var games = StreamStore.getGames();
    this.setState({
      games: games
    })
  }

  onChange() {
    this.setState({
      streams: StreamStore.getAllStreams(),
      fetching: false
    });
  }

  searchStreams(game, languagePt) {
    if (this.state.fetching)
      return;
    var newState = this.state;
    newState.fetching = true;
    if (game)
      newState.game = game;
    if (languagePt)
      newState.languagePt = languagePt.target.checked;
    this.setState(newState);
    StreamActions.getStreams(null, this.state.languagePt || (languagePt && languagePt.target.checked) ? 'pt-br' : null, this.state.game || game);
  }

  renderStreams() {
    if (!this.state.streams || this.state.streams.length == 0)
      return null;
    var htmlStreamList = this.state.streams.map((stream, i)=> {
        stream.status = StreamMixin.cleanStreamName(stream.status);
        var style = {"background": "url(" + stream.image + ") no-repeat center", width:'100%'};
        let content = (
          <div className="stream-search-item">
            <div className="lobby-block" style={style}>
              <span className="caption">[{stream.country}]{stream.status}</span>
              <div className="join-button">
                <a onClick={ this.props.changeChannel.bind(null, stream.name)}>Ver stream</a>
              </div>
            </div>
            <div className="lobby-info">
              <span className="left stream-info">
                <b>Usuário:</b> {stream.user}
              </span>
              <br/>
              <span className="left stream-info">
                <b>Jogo:</b> {stream.game}
              </span>
              <br/>
              <span className="left stream-info">
                <b>Assistindo:</b> {stream.viewers} pessoas
              </span>
              <br/>
              <span className="left">
                <b>Duração:</b> {StreamMixin.getDuration(stream.created_at)} h
              </span>
              <div className="clear-float"></div>
            </div>
          </div>);
        return (
          <ListWrapper className='streamLink' content={content} key={stream.id}>
          </ListWrapper>);
      });

    return (
      <ol className='streamList'>
        {htmlStreamList}
      </ol>);

  }
  refreshStreams(e) {
    e.preventDefault();
    if (this.state.fetching)
      return;
    StreamActions.getStreams(null, this.state.languagePt  ? 'pt-br' : null, this.state.game );
    this.setState({
      fetching: true
    })
  }

  render() {
    var style = this.props.style || {};
    style.display = this.props.visible? 'initial' : 'none';
    return (
      <div style={style} className="stream-search-theater panel-games-lobby">
        <div className="stream-search-menu">
          <div className="stream-search-games">
            <span className="first">Jogo:</span>
            <a href="#" onClick={this.refreshStreams.bind(this)} style={{'marginRight': 10, float: 'right'}}
               className={this.state.fetching ? 'loader-spinner' : ''}>
              <i className="fa fa-refresh"/>
            </a>
            <Autocomplete
              ref="autocomplete"
              items={this.state.games}
              getItemValue={(item) => item.name}
              onSelect={(value, item) => {
                  this.searchStreams(value);
                }}
              onChange={(event, value) => {
            this.setState({
              game: value
            });
            StreamActions.searchGames(value);
          }}
              renderItem={(item, isHighlighted) => (
            <div className="stream-game-autocomplete"><img src={item.box.small}/><span>{item.name}</span></div>
          )}
            />
          </div>
          <div className="language-search-stream">
            <span className="first">PT / PT-BR:</span>
            <input type="checkbox" checked={this.state.languagePt}
                   onChange={this.searchStreams.bind(this,null)}/>
          </div>

        </div>
        {this.renderStreams()}
      </div>
    );
  }

}

export default StreamSearch;
