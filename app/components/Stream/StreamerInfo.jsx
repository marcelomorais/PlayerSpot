import React, { Component } from 'react';

class StreamerInfo extends Component {

  static propTypes = {};

  renderPanels() {
    let panels = this.props.streamData.panel;
    let htmlPanels = panels.map(function (panel) {
      let data = panel.data;
      return (
        <div key={panel._id} className={this.props.theaterMode ? "streamer-panel" : "streamer-panel"}>
          {data.title ? <h3 className="panel-title">{data.title}</h3> : null}
          {data.image ? <a href={data.link} target="_blank"><img src={data.image}/></a> : null}
          <span dangerouslySetInnerHTML={{__html: panel.html_description }}></span>
        </div>)
    }.bind(this));
    return (
      <div>
        {htmlPanels}
      </div>
    )
  }

  render() {
    var style = this.props.style || {};
    style.display =  this.props.visible? 'initial' : 'none';
    return (<div style={style}>
      {this.props.streamData ? this.renderPanels() : null}
    </div>);
  }

}

export default StreamerInfo;
