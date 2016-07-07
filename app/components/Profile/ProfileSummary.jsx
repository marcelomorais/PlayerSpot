import React, { Component } from 'react';

class ProfileSummary extends Component {

  renderFriendsList() {
    let friends = this.props.friends,
      htmlFriendsList = friends.map(friend => {
        let content = (
          <a href={"#/profile/" + friend.username} className="avatar online user-tooltip">
            <img src={friend.image} className="setborder" title="" alt=""/>
          </a>);
        return (
          <ListWrapper content={content}>
          </ListWrapper>);
      });
    return (
      <ul className="profile-friends-list">
        {htmlFriendsList}
      </ul>);
  }

  render() {
    return(
      <div className="profile-right-side" style={{ display: this.props.profileInfo == 1 ? 'initial' : 'none'}}>

        <h2><span>Resumo do perfil</span></h2>
        <div className="content-padding">
          <div className="info-blocks">
            <ul>
              <li><a href="#" className="info-block"><b>{this.props.friends.length}</b><span>Amigos</span></a></li>
              <li><a href="#" className="info-block"><b>300</b><span>Posts no fórum</span></a></li>
            </ul>
            <div className="clear-float"></div>
          </div>

          <div>
            <div style={{"width":350}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Informação geral</span></h2>

              <ul className="profile-info">
                <li>
                  <span className="first">Nome:</span>
                  <span className="last">{this.props.name}</span>
                </li>
                <li>
                  <span className="first">Gênero:</span>
                  <span className="last">{this.props.gender}</span>
                </li>
                <li>
                  <span className="first">Aniversário:</span>
                  <span className="last">{this.props.birthday}</span>
                </li>
                <li>
                  <span className="first">Localização:</span>
                  <span className="last">{this.props.location}</span>
                </li>
                <li>
                  <span className="first">Cadastrado desde</span>
                  <span className="last">{this.props.creationDate}</span>
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>

            <div style={{"width":370, marginLeft: 30}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Equipamentos</span></h2>

              <ul className="profile-info">
                <li>
                  <span className="first">Mouse:</span>
                  <span className="last">{this.props.gear.mouse}</span>
                </li>
                <li>
                  <span className="first">Sensibilidade do mouse:</span>
                  <span className="last">{this.props.gear.mouseSens}</span>
                </li>
                <li>
                  <span className="first">Teclado:</span>
                  <span className="last">{this.props.gear.keyboard}</span>
                </li>
                <li>
                  <span className="first">Mousepad:</span>
                  <span className="last">{this.props.gear.mousepad}</span>
                </li>
                <li>
                  <span className="first">Headphone:</span>
                  <span className="last">{this.props.gear.headphone}</span>
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>

            <div className="clear-float"></div>
          </div>

          <div>
            <div style={{"width":450}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Redes sociais</span></h2>

              <ul className="profile-info">
                <li>
                  <span className="first">Twitter:</span>
                  <span className="last"><a href={this.props.social.twitter} target="blank">{this.props.social.twitter}</a></span>
                </li>
                <li>
                  <span className="first">Facebook:</span>
                  <span className="last"><a href={this.props.social.facebook} target="blank">{this.props.social.facebook}</a></span>
                </li>
                <li>
                  <span className="first">Instagram:</span>
                  <span className="last"><a href={this.props.social.facebook} target="blank">{this.props.social.instagram}</a></span>
                </li>
                <li>
                  <span className="first">TwitchTv:</span>
                  <span className="last"><a href={this.props.social.facebook} target="blank">{this.props.social.twitchtv}</a></span>
                </li>
                <li>
                  <span className="first">Youtube</span>
                  <span className="last"><a href={this.props.social.facebook} target="blank">{this.props.social.youtube}</a></span>
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>

            <div style={{"width":295, marginLeft: 30}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Redes jogos</span></h2>

              <ul className="profile-info">
                <li>
                  <span className="first">Steam:</span>
                  <span className="last">{this.props.game.steam}</span>
                </li>
                <li>
                  <span className="first">BattleNet:</span>
                  <span className="last">{this.props.game.battlenet}</span>
                </li>
                <li>
                  <span className="first">LeagueOfLegends:</span>
                  <span className="last">{this.props.game.leagueoflegends}</span>
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>
            <div className="clear-float"></div>
          </div>
        </div>
      </div>
    );
  }

}

export default ProfileSummary;
