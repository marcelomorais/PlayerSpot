import React, { Component } from 'react';
import moment from 'moment';

class Toolbar extends Component {

  static propTypes = {};

  renderToolBar() {
    let streamData = this.props.streamData;
    if (!streamData || !streamData.stream)
      return;
    return (<div className="toolbar-stream">
      <div style={{float:'left'}}>
        <img title={streamData.stream.channel.name} className="streamer-logo" width="32"
             src={streamData.stream.channel.logo}/>
        { streamData.following ?
        <a href="#" onClick={this.props.followChannel.bind(null,streamData.stream.channel.name)}
           className="defbutton default"><i className="fa fa-heart" style={{color: '#5AE0CC'}}></i><span>Seguindo</span></a> :
          <a href="#" onClick={this.props.followChannel.bind(null,streamData.stream.channel.name)}
             className="defbutton default"><i className="fa fa-heart"></i><span>Seguir</span></a>
        }
        {streamData.subscribing != 422 ? (!streamData.subscribing ? <a
          className="defbutton default stream-subscribe" target="_blank"
          href={streamData.stream.channel.url+"/subscribe?ref=below_video_subscribe_button"}>
            <span className="subscribe-text">
              Subscribe
            </span>
            <span className="subscribe-price">
              $ 4,99
            </span>
        </a> : null) : null }
        <a href="#" onClick={this.props.theatherModeStream}
          className="defbutton default"><i className="fa fa-desktop"></i><span>Modo Teatro</span></a>
        <a href="#" onClick={this.props.reloadStream}
           className="defbutton default"><i className="fa fa-refresh"></i><span>Refresh</span></a>
      </div>
      <div style={{float:'right'}} className="defbutton toolbar-right">
        <span title="Início da stream"><i className="fa fa-clock-o"
                                          style={{color:'rgb(88, 126, 153)'}}/>{moment(moment(streamData.stream.created_at).toDate()).format('HH:mm')}</span>
        <span title="Assistindo"><i className="fa fa-user"
                                    style={{color:'red'}}/>{this.numberWithCommas(streamData.stream.viewers)}</span>
        <span title="Total visualizações"><i style={{color:'rgb(88, 126, 153)'}}
                                             className="fa fa-eye"/>{this.numberWithCommas(streamData.stream.channel.views)}</span>
        <span title="Seguidores"><i className="fa fa-heart"
                                    style={{color:'rgb(88, 126, 153)'}}/>{this.numberWithCommas(streamData.stream.channel.followers)}</span>

      </div>
    </div>)
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return(
      <div>
        {this.renderToolBar()}
      </div>
    );
  }

}

export default Toolbar;
