import React, { Component } from 'react';

class Chat extends Component {

  static propTypes = {};

  render() {
    var style = this.props.style || {};
    style.display = this.props.visible? 'initial' : 'none';
    return (
      <iframe frameBorder="0"
              scrolling="no"
              id="chat_embed"
              src={"http://www.twitch.tv/" + this.props.channel + '/chat'}
              height={ this.props.height || "700" }
              style={style}
              width="100%">
      </iframe>);
  }

}

export default Chat;
