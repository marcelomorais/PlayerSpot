import React, { Component } from 'react';
import AccountStore from '../../stores/accountStore'
import AccountActions from '../../actions/accountActions'
import { Link } from 'react-router'

class TopBar extends Component {

  static defaultProps = {
    changeSidebar: function () {
    }
  };

  render() {
    return (
      <div id="header-top" style={{background :'rgba(6, 6, 6, 0.48)'}}>
        <div className="wrapper" style={{margin : '', width:'100%',
                                        float: 'right' }}>
          <ul className="right">
            <li><a href="#" target="_blank"><i className="fa fa-facebook"/></a></li>
            <li><a href="#" target="_blank"><i className="fa fa-twitter"/></a></li>
            <li><a href="#" target="_blank"><i className="fa fa-youtube-play"/></a></li>
            <li><a href="#" target="_blank"><i className="fa fa-twitch"/></a></li>
            <li><a href="#" target="_blank"><i className="fa fa-steam"/></a></li>
            <li>
              <a href="#"
                 onClick={this.props.sidebar == 1 ? this.props.changeSidebar.bind(null,0) : this.props.changeSidebar.bind(null,1)}
                 className={this.props.sidebar == 1 ? "defbutton default theater-menu-selected" : "defbutton default"}>
                Buscar streams</a>
            </li>
            <li>
              <a href="#"
                 onClick={this.props.sidebar == 2 ? this.props.changeSidebar.bind(null,0) : this.props.changeSidebar.bind(null,2)}
                 className={this.props.sidebar == 2 ? "defbutton default theater-menu-selected" : "defbutton default"}>Dados
                streamer</a></li>
            <li>
              <a href="#"
                 onClick={this.props.sidebar == 3 ? this.props.changeSidebar.bind(null,0) : this.props.changeSidebar.bind(null,3)}
                 className={this.props.sidebar == 3 ? "defbutton default theater-menu-selected" : "defbutton default"}>Chat</a>
            </li>
            <li>
              <a href="#"
                 onClick={this.props.sidebar == 4 ? this.props.changeSidebar.bind(null,0) : this.props.changeSidebar.bind(null,4)}
                 className={this.props.sidebar == 4 ? "defbutton default theater-menu-selected" : "defbutton default"}>Partida Atual</a>
            </li>
            <li>
              <a href="#" onClick={this.props.reloadStream} className="defbutton default">Recarregar stream</a>
            </li>
            <li>
              <a href="#" onClick={this.props.backNormalMode} className="defbutton default">Fechar</a>
            </li>
          </ul>
          <ul className="load-responsive" rel="Top menu">
            <li>
                <a href="#" style={{padding: '0 !important', width: 130}}>
                  <img src="images/o-logo.png" className="ologo topbar-logo" alt="PlayerSpot" title=""/>
                   <strong className="stream-playerspot">PlayerSpot</strong>
                </a></li>
          </ul>
        </div>
      </div>
    );
  }

}

export default TopBar;
