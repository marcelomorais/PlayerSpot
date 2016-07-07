import React, { Component } from 'react';
import ListWrapper from '../../mixins/ListWrapper'
import moment from 'moment';
import BasicDataStore from '../../stores/basicDataStore'
import InitializeActions from '../../actions/initializeActions'
import StreamStore from '../../stores/streamStore';
import StreamActions from '../../actions/streamActions';
import LinkState, {LinkWithState} from '../../mixins/LinkedStateMixin';
import Autocomplete from 'react-autocomplete';
import Actions from '../../constants/ActionTypes';
import _ from 'lodash'
import StreamMixin from '../../mixins/StreamMixin';

var autoCompleteStyle = {
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  maxHeight: '50%',
  zIndex: 10,
}

class StreamList extends Component {

  static propTypes = {streams: React.PropTypes.array};

  constructor(props) {
    super(props);
    var gameName = this.props.game;
    if(gameName) {
      if(!isNaN(gameName[gameName.length-1]))
        gameName = gameName.slice(0, -1);
      StreamActions.searchGames(gameName);
    }
    this.state = {
      streams: this.props.streams || [],
      games: [],
      fetching: false,
      languagePt: true,
      initProps: true
    }
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    this.gameListener = this.onGameChange.bind(this);
    this.basicListener = this.onBasicData.bind(this);
    BasicDataStore.addChangeListener(this.basicListener);
    StreamStore.addChangeListener(this.gameListener, Actions.STREAM_GAMES_GET);
    StreamStore.addChangeListener(this.changeListener, Actions.STREAMS_GET);
  }

  componentWillUnmount() {
    BasicDataStore.removeChangeListener(this.basicListener);
    StreamStore.removeChangeListener(this.gameListener, Actions.STREAM_GAMES_GET);
    StreamStore.removeChangeListener(this.changeListener, Actions.STREAMS_GET);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.game && nextProps.game != this.props.game) {
      var gameName = nextProps.game;
      if(!isNaN(gameName[gameName.length-1]))
        gameName = gameName.slice(0, -1);
      StreamActions.searchGames(gameName);
      this.setState({
        initProps: true,
        streams: []
      })
    }
  }

  onGameChange() {
    var games = StreamStore.getGames();
    if(this.state.initProps) {
      this.searchStreams(games[0].name);
      this.setState({
        initProps: false
      })
    }
    else {
      this.setState({
        games: games
      })
    }
  }

  onBasicData() {
    this.setState({
      streams: this.props.game? [] : _.take(BasicDataStore.getAllStreams(), this.props.streamsAmount)
    });
  }

  onChange() {
    this.setState({
      streams: _.take(StreamStore.getAllStreams(), this.props.streamsAmount),
      fetching: false
    });
  }

  refreshStreams(e) {
    e.preventDefault();
    if (this.state.fetching)
      return;
    StreamActions.getStreams(null, this.state.languagePt ? 'pt-br' : null, this.state.game);
    this.setState({
      fetching: true
    })
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
    let streamsObject = this.state.streams,
      htmlStreamList = streamsObject.map((stream, i)=> {
        stream.status = StreamMixin.cleanStreamName(stream.status);
        var style = {"background": "url(" + stream.image + ") no-repeat center", width:'100%'};
        let content = (
          <div>
            <div className="lobby-block" style={style}>
              <span className="caption">[{stream.country}]{stream.status}</span>
              <div className="join-button">
                <a href={'/#/stream/' + stream.name}>Ver stream</a>
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

  render() {
    return (
      <div className="panel">
        <h2>Streams ativas</h2>
        <div className="top-right">
          <a href="#">Ver todas</a>
        </div>
        <div className="panel-content">
          <div className="panel-games-lobby">
            <div className="stream-search-games">
              <a href="#" onClick={this.refreshStreams.bind(this)} style={{'marginRight': 5, float: 'right', marginTop: -20}}
                 className={this.state.fetching ? 'loader-spinner' : ''}>
                <i className="fa fa-refresh"/>
              </a>
              <Autocomplete
                menuStyle={autoCompleteStyle}
                inputProps={{placeholder:'Jogo'}}
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
              <span className="first" style={{fontFamily: 'Oswald, sans-serif'}}>PT / PT-BR:</span>
              <input type="checkbox" checked={this.state.languagePt}
                     onChange={this.searchStreams.bind(this,null)}/>
            </div>
            {this.renderStreams()}
          </div>
        </div>
      </div>)
  }
}

export default StreamList;
