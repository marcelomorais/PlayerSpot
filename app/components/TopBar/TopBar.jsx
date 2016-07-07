import React, { Component } from 'react';
import AccountStore from '../../stores/accountStore'
import AccountActions from '../../actions/accountActions'
import { Link } from 'react-router'

class TopBar extends Component {

  static defaultProps = {
    theaterMode: false,
    changeSidebar: function () {
    }
  };

  constructor(props) {
    super(props);
    if (AccountStore.getToken())
      this.state = {
        token: AccountStore.getToken(),
        user: AccountStore.getUser(),
        admin: AccountStore.getAdmin()
      }
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    AccountStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      user: AccountStore.getUser(),
      token: AccountStore.getToken(),
      admin: AccountStore.getAdmin()
    });
  }

  logout(event) {
    event.preventDefault();
    AccountActions.logout();
  }

  render() {
    return (
      <div id="header-top">
        <div className="wrapper">
          <ul className="right">
            {AccountStore.getAdmin() ? <li key='top-paineladm'><a href="/#/admin">Painel Admin</a></li> : null}
            {!AccountStore.getToken() ? <li key='top-login'><a href="/#/login">Entrar</a></li> : <li><Link
              to={`/profile/${this.state.user}`}>{this.state.user}</Link></li>}
            {!AccountStore.getToken() ? <li><a href="/#/signup">Registrar</a></li> :
              <li><a href="/#/logout" onClick={this.logout.bind(this)}>Sair</a>
              </li>}
          </ul>
          <ul className="load-responsive" rel="Top menu">
            <li>
              { this.props.embedHeader ?
               <a href="#" style={{padding: '0 !important'}}><img src="images/o-logo.png" className="ologo topbar-logo" alt="PlayerSpot" title=""/></a> : null}</li>
            {!this.props.embedHeader ?
              [<li key='top-facebook'><a href="#" target="_blank"><i className="fa fa-facebook"/></a></li>,
                <li key='top-twitter'><a href="#" target="_blank"><i className="fa fa-twitter"/></a></li>,
                <li key='top-youtube'><a href="#" target="_blank"><i className="fa fa-youtube-play"/></a></li>,
                <li key='top-twitch'><a href="#" target="_blank"><i className="fa fa-twitch"/></a></li>,
                <li key='top-steam'><a href="#" target="_blank"><i className="fa fa-steam"/></a></li>] : null}
            {this.props.embedHeader ?
            [<li key='fa-lol'><a href="/#/game/lol"><img width="15" height="15" src="/images/icons/lol.png"/></a></li>] : null}
          </ul>
        </div>
      </div>
    );
  }

}

export default TopBar;
