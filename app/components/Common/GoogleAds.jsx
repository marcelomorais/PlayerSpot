import React, { Component } from 'react';

class GoogleAds extends Component {

  static propTypes = {
    height: React.PropTypes.string,
    width: React.PropTypes.string,
    position: React.PropTypes.string,
    client: React.PropTypes.string.isRequired,
    slot: React.PropTypes.string.isRequired,
    format: React.PropTypes.string,
    display: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    height: "100%",
    width: "100%"
  };

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins className="adsbygoogle"
           style={{
					display: this.props.display,
					height: this.props.height + 'px',
					width: this.props.width + 'px',
          position: this.props.position
				}}
           data-ad-client={this.props.client}
           data-ad-slot={this.props.slot}
           data-ad-format={this.props.format}></ins>
    )
  }

}

export default GoogleAds;
