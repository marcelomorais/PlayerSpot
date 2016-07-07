import React, { Component } from 'react';

class SocialPanel extends Component {

  render() {
    return(
      <div className="panel">
        <h2>Redes Sociais</h2>
        <div className="panel-content socialize">
          <a href="#" target="_blank" className="strike-tooltip s-fb" title="Visit Facebook"><i
            className="fa fa-facebook"/></a>
          <a href="#" target="_blank" className="strike-tooltip s-tw" title="Visit Twitter"><i
            className="fa fa-twitter"/></a>
          <a href="#" target="_blank" className="strike-tooltip s-yt" title="Visit YouTube"><i
            className="fa fa-youtube-play"/></a>
          <a href="#" target="_blank" className="strike-tooltip s-tc" title="Visit Twitch"><i className="fa fa-twitch"/></a>
          <a href="#" target="_blank" className="strike-tooltip s-st" title="Visit Steam"><i
            className="fa fa-steam"/></a>
        </div>
      </div>
    );
  }

}

export default SocialPanel;
