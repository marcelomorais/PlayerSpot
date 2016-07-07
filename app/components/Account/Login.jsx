import React, { Component } from 'react';
import WhyRegister from './WhyRegister';
import LinkState from '../../mixins/LinkedStateMixin';
import AccountStore from '../../stores/accountStore';
import AccountActions from '../../actions/accountActions';
import Authenticate from '../../mixins/AuthenticatedMixin';
import {twitchID, host} from '../../config'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null
    };
    let code = this.props.location.query.code;
    if (code)
      AccountActions.externalLogin(code);
  }

  submit(event) {
    event.preventDefault();
    var account = {username: this.state.username, password: this.state.password};
    AccountActions.login(account);
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    AccountStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.changeListener);
  }

  twitchTvUrl() {
    return 'https://api.twitch.tv/kraken/oauth2/authorize' +
      '?response_type=code' +
      '&client_id=' + twitchID +
      '&scope=user_subscriptions user_follows_edit user_blocks_read' +
      '&redirect_uri=' + host +'/API/Account/ExternalLogin' ;
  }

  onChange() {
    this.setState({
      error: AccountStore.getError()
    });

    if (!this.state.error)
      location.hash = "#/profile/" + AccountStore.getUser();
  }

  render() {
    return (
      <div id="main">
        <div className="signup-panel">

          <div className="left">
            <h2><span>Entrar</span></h2>
            <div className="content-padding">
              <p className="p-padding">Faça seu login abaixo para poder participar ativamente do portal.</p>
              <div className="login-passes">
                <b>Ou faça login com:</b>
                <a href={this.twitchTvUrl()} target="_parent" class="strike-tooltip" title="Use Twitch.tv passport"><img src="images/social-icon-twitch.png" alt="" /></a>
              </div>
              <div className="the-form" style={{"marginTop":"40px",'width': 310}}>
                <form action="" method="post">
                  { this.state.error ? <p><span className="the-error-msg"><i
                    className="fa fa-warning"/>{this.state.error.message}</span>
                  </p> : null}
                  <p>
                    <label for="login_username">Usuário:</label>
                    <input type="text" name="login_username" id="login_username"
                           valueLink={LinkState.call(this,'username')}/>
                  </p>

                  <p>
                    <label for="login_password">Senha:</label>
                    <input type="password" name="login_password" id="login_password"
                           valueLink={LinkState.call(this,'password')}/>
                  </p>

                  <p>
                    <label for="">&nbsp;</label>
                    <input type="checkbox" name="login_remember" id="login_remember" value=""/>

                    <label className="iiiii" for="login_remember">Lembre-me</label>
                  </p>

                  <p className="form-footer">
                    <input type="submit" name="login_submit" id="login_submit" value="Entrar"
                           onClick={this.submit.bind(this)}/>
                  </p>

                  <p style={{"marginTop":"40px",'width': 340}}>
                      <span className="info-msg">Se não possuir uma conta, <a href="/#/signup">registre-se</a> !<br />Se perdeu sua senha <a
                        href="/#/signup-password">clique aqui</a>!</span>
                  </p>

                </form>
              </div>

            </div>
          </div>

          <WhyRegister/>

          <div className="clear-float"></div>
        </div>

      </div>)
  }

}
export default Login;
