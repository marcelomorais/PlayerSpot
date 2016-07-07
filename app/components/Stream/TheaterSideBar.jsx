import React, { Component } from 'react';
import Chat from './Chat';
import StreamerInfo from './StreamerInfo';
import StreamSearch from './StreamSearch';
import GameData from './GameData';

class TheaterSideBar extends Component {

  static propTypes = {};

  componentWillReceiveProps(nextProps) {
    if(nextProps.sidebar == 3)
    {
      $(".mCSB_container").css('margin-right', '0px');
    }
    else{
      $(".mCSB_container").css('margin-right', '15px');
    }
    if (nextProps.fullScreen && !this.props.fullScreen)
      this.props.changeSidebar(3);
  }

  render() {
    return (
      <div className="theater-sidebar">
        <div className="theater-sidebar-content"
             style={{display: this.props.sidebar ? 'initial' : 'none', height: window.screen.height - 150 + 'px'}}>
          <Chat channel={this.props.channel} visible={this.props.sidebar == 3}
              height={window.screen.height - 150 + 'px'}/>
          <StreamerInfo streamData={this.props.streamData} visible={this.props.sidebar == 2} scroll={true}
                        style={{position:'relative', right: 5}} theaterMode={true}/>
          <StreamSearch visible={this.props.sidebar == 1} changeChannel={this.props.changeChannel}
                        style={{position:'relative', right: 5}}/>
                      { this.props.streamData ? <GameData game={this.props.streamData.stream.game} channel={this.props.channel} visible={this.props.sidebar == 4} theaterMode={true}/>
            : null}
        </div>
      </div>
    );
  }

}

export default TheaterSideBar;
