import React, { Component } from 'react';
import StreamActions from '../../actions/streamActions';
import StreamStore from '../../stores/streamStore';
import Chat from './Chat';
import StreamerInfo from './StreamerInfo';
import GameData from './GameData';
import Toolbar from './Toolbar';
import TheaterSideBar from './TheaterSideBar';
import ActionTypes from '../../constants/ActionTypes';
import _ from 'lodash';
import Tabs from '../Common/Tabs';
import TopBar from './Topbar';

class Stream extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    var currentChannel = this.props.params.channel;
    StreamActions.getStreamerData(currentChannel);
    //GameActions.getGames();
    this.state = {
      streamData: null,
      fullScreen: false,
      theaterMode: false,
      tab: 0,
      sidebar: 0,
      channel: currentChannel
    }
  }

  componentWillReceiveProps(nextProps) {
    StreamActions.getStreamerData(nextProps.params.channel);
    this.setState({
      streamData: null,
      tab: 0,
      channel: nextProps.params.channel,
      possibleCharacters: null
    });
  }

  changeChannel(channel) {
    StreamActions.getStreamerData(channel);
    this.setState({
      channel
    })
  }

  componentWillMount() {
    this.loadListener = this.onLoad.bind(this);
    this.followListener = this.onFollow.bind(this);
    StreamStore.addChangeListener(this.loadListener, ActionTypes.STREAMER_GET);
    StreamStore.addChangeListener(this.followListener, ActionTypes.STREAMER_FOLLOW);
  }

  componentDidMount() {
    document.getElementById('main').scrollIntoView();
  }

  changeSidebar(sidebar, event) {
    if (event)
      event.preventDefault();
    if(this.state.theaterMode && !sidebar)
      return;
    var iframe = document.getElementById('stream-iframe');
    if (sidebar) {
      iframe.className += ' sidebar-stream ';
    }
    else {
      iframe.className = iframe.className.replace(' sidebar-stream ', '');
    }
    this.setState({
      sidebar
    })
  }

  componentWillUnmount() {
    StreamStore.removeChangeListener(this.loadListener, ActionTypes.STREAMER_GET);
    StreamStore.removeChangeListener(this.followListener, ActionTypes.STREAMER_FOLLOW);
  }

  launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  theatherModeStream(event) {
    event.preventDefault();
    this.setState({
      theaterMode: true
    })
    var theaterMode = document.getElementById('theater-mode-wrapper');
    theaterMode.className += ' theater-mode-onscreen ';
    var iframeStream = document.getElementById('stream-iframe');
    iframeStream.className = 'iframe-onscreen';
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
    var elements = document.getElementsByClassName('theater-elements');
    elements[0].style.display = 'initial';
    document.getElementById('header-top').style.display = 'none';
    $(".theater-sidebar-content").mCustomScrollbar();
    this.changeSidebar(3);
  }

  fullScreenStream(event) {
    event.preventDefault();
    var theaterMode = document.getElementById('theater-mode-wrapper');

    function changeHandler() {
      var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      var elements = document.getElementsByClassName('theater-elements');
      var iframeStream = document.getElementById('stream-iframe');
      for (var i = 0; i < elements.length; i++) {
        if (state) {
          elements[i].style.display = 'initial';
          iframeStream.style.height = '95%';
          iframeStream.style.marginTop = '40px';
        }
        else {
          elements[i].style.display = 'none';
          iframeStream.style.height = '100%';
          iframeStream.style.marginTop = '0px';
          iframeStream.className = '';
        }
      }

      this.setState({
        fullScreen: state
      });
    }

    var browserEvents = ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange'];
    browserEvents.forEach(function (browser) {
      theaterMode.removeEventListener(browser, changeHandler.bind(this), false);
      theaterMode.addEventListener(browser, changeHandler.bind(this), false);
    }.bind(this));
    this.launchIntoFullscreen(theaterMode);
  }

  onFollow() {
    if (!StreamStore.getError()) {
      let streamData = this.state.streamData;
      streamData.following = true;
      this.setState({
        streamData
      })
    }
  }

  selectTab(tab, event) {
    if (event)
      event.preventDefault();
    this.setState({
      tab
    })
  }

  backNormalMode(event) {
    if (event)
      event.preventDefault();
    this.setState({
      fullScreen: false,
      theaterMode: false
    });
    var theaterMode = document.getElementById('theater-mode-wrapper');
    theaterMode.className = theaterMode.className.replace(' theater-mode-onscreen ','');
    var iframeStream = document.getElementById('stream-iframe');
    iframeStream.className = '';
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'auto';
    var elements = document.getElementsByClassName('theater-elements');
    elements[0].style.display = 'none';
    document.getElementById('header-top').style.display = 'initial';
  }

  reloadStream(event){
    if(event)
      event.preventDefault();
    var iframeStream = document.getElementById('stream-iframe');
    iframeStream.src = iframeStream.src;
  }
  getTabs() {
    return [
      {
        id: 0,
        name: 'Streamer',
      },
      {
        id: 1,
        name: 'Chat',
      },
      {
        id: 2,
        name: 'Partida Atual',
      },
      {
        id: 3,
        name: 'Analise streamer',
      }
    ]
  }

  onLoad() {
    var channel = this.state.channel;

    let streamData = StreamStore.getCurrentStream();
    this.setState({
      streamData,
      streamGame: streamData.game,
    });
    this.selectTab(0);
  }

  followChannel(channel, event) {
    event.preventDefault();
    StreamActions.followChannel(channel);
  }

  renderStream() {
    return (
      <iframe id="stream-iframe"
              src={"http://player.twitch.tv/?channel="+ this.state.channel}
              height="100%"
              width="100%"
              frameBorder="0" scrolling="no">
      </iframe>
    )
  }

  render() {
    return (
      <div id="main">
        <div className="main-content">
          <div id="stream-content">
            <div id="theater-mode-wrapper" className="full-div">
              <div className="theater-elements">
                <TopBar theaterMode={true} {...this.state} backNormalMode={this.backNormalMode.bind(this)}
                        changeSidebar={this.changeSidebar.bind(this)} channel={this.state.channel}
                        reloadStream={this.reloadStream.bind(this)}/>
                <TheaterSideBar changeChannel={this.changeChannel.bind(this)} {...this.state}
                                changeSidebar={this.changeSidebar.bind(this)} channel={this.state.channel}/>
              </div>
              {this.renderStream()}
            </div>
            <Toolbar {...this.state} followChannel={this.followChannel}
                                     theatherModeStream={this.theatherModeStream.bind(this)}
                                     fullScreenStream={this.fullScreenStream.bind(this)}
                                     reloadStream={this.reloadStream.bind(this)}/>
            <div className="">
              <Tabs tabs={this.getTabs()} tab={this.state.tab} selectTab={this.selectTab.bind(this)}/>
              <StreamerInfo streamData={this.state.streamData} visible={this.state.tab == 0}/>
              <Chat {...this.props} channel={this.state.channel} visible={this.state.tab == 1}/>
              { this.state.streamData && this.state.streamData.stream ?
                <GameData {...this.props} game={this.state.streamData.stream.game} channel={this.state.channel} visible={this.state.tab == 2}/>
                : null}
            </div>
          </div>
        </div>
      </div>);
  }

}

export default Stream;
