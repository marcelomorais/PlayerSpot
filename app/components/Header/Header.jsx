import React, { Component } from 'react';
import GoogleAds from '../Common/GoogleAds';


class Header extends Component {

  render() {
    return (
      <header id="header">
        <div id="menu-bottom">
          <nav id="menu" className="main-menu">
            <a href="/#/" className="header-logo left">
              <img src="images/o-logo.png" className="ologo" alt="PlayerSpot" title=""/>
              <img src="images/logo.png" className="logo" alt="PlayerSpot" title=""/>
            </a>
            <ul className="load-responsive" rel="Main menu">
              <li style={{width: '8%'}}><a href="/#/game/lol"><span><img height="50" src="/images/icons/lol.png"/><strong>LOL</strong></span></a></li>
              <li style={{width: '8%'}}><a href="/#/game/dota2"><span><img height="50" src="/images/icons/dota2.png"/><strong>Dota 2</strong></span></a></li>
              <li style={{width: '8%'}}><a href="/#/game/csgo"><span><img height="50" src="/images/icons/csgo.png"/><strong>CS:GO</strong></span></a></li>
              <li style={{width: '8%'}}><a href="/#/game/hots"><span><img height="50" src="/images/icons/hots.png"/><strong>HOTS</strong></span></a></li>
              <li style={{width: '8%'}}><a><span><i className="fa fa-users"/><strong>Outros Jogos</strong></span></a>
                <ul className="sub-menu">
                  <li><a href="/#/game/h1z1">H1Z1</a></li>
                  <li><a href="/#/game/hearthstone">Hearthstone</a></li>
                  <li><a href="/#/game/overwatch">Overwatch</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="top-ad"></div>
      </header>
    )
  }

}
export default Header;
