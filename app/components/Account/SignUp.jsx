import React, { Component } from 'react';
import LinkState from '../../mixins/LinkedStateMixin';
import AccountActions from '../../actions/accountActions';
import AccountStore from '../../stores/accountStore';
import WhyRegister from './WhyRegister';
import Authenticate from '../../mixins/AuthenticatedMixin'

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      error:{}
    };
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
      error: AccountStore.getError()
    });

    if(!this.state.error)
      location.hash = "#/profile/" + this.state.username;
  }

  submit(event){
    event.preventDefault();
    var account = {
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      email: this.state.email
    };

    AccountActions.register(account);
  }

  render() {
    return (
      <div id="main">
        <div className="signup-panel">

          <div className="left">
            <h2><span>Registrar</span></h2>
            <div className="content-padding">
              <p className="p-padding">Crie sua conta abaixo para poder participar ativamente do portal.</p>

              <div className="the-form">
                <form action="" method="post">

                  <p>
                    <label htmlFor="signup_username">Usuário:<span className="required">*</span></label>
                    <input required className={this.state.error && this.state.error.field == 'user' ? "error-input" : ""} type="text"valueLink={LinkState.call(this,'username')}/>
                    {this.state.error && this.state.error.field == 'user' ? <span className="error-msg">{this.state.error.message}</span> : null}
                  </p>

                  <p>
                    <label htmlFor="signup_email">E-mail:<span className="required">*</span></label>
                    <input required  className={this.state.error && this.state.error.field == 'email' ? "error-input" : ""} type="text" valueLink={LinkState.call(this,'email')}/>
                    {this.state.error && this.state.error.field == 'email' ? <span className="error-msg">{this.state.error.message}</span> : null}
                  </p>

                  <p>
                    <label htmlFor="signup_password">Senha:<span className="required">*</span></label>
                    <input required  className={this.state.error && this.state.error.field == 'password' ? "error-input" : ""} type="password" valueLink={LinkState.call(this,'password')}/>
                    {this.state.error && this.state.error.field == 'password' ? <span className="error-msg">{this.state.error.message}</span> : null}
                  </p>

                  <p>
                    <label htmlFor="signup_password_r">Repita a senha:<span className="required">*</span></label>
                    <input required  className={this.state.error && this.state.error.field == 'passaword2' ? "error-input" : ""} type="password" valueLink={LinkState.call(this,'password2')}/>
                    {this.state.error && this.state.error.field == 'password2' ? <span className="error-msg">{this.state.error.message}</span> : null}
                  </p>

                  <p className="form-footer">
                    <input type="submit" name="signup_submit" id="signup_submit" value="Registrar" onClick={this.submit.bind(this)}/>
                  </p>

                  <p>
                    <span className="info-msg">Caso já possua uma conta clique em <a href="/#/login">entrar</a> !</span>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <WhyRegister/>
          <div className="clear-float"></div>
        </div>
      </div>);
  }

}

export default SignUp;
