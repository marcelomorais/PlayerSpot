import React, { Component } from 'react';
import AccountStore from '../../stores/accountStore';
import ProfileStore from '../../stores/profileStore';
import ProfileActions from '../../actions/profileActions';
import LinkState, {LinkWithState} from '../../mixins/LinkedStateMixin';
import Authenticate from '../../mixins/AuthenticatedMixin'
import _ from 'lodash'
import moment from 'moment'

class ProfileEdition extends Component {

  constructor(props) {
    super(props);
    Authenticate();
    this.state = {
      profile: {
        friends: [],
        achievements: [],
        gear: {}
      }
    };
    ProfileActions.getProfile(this.props.user);
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    ProfileStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ProfileStore.removeChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      profile: ProfileStore.getProfile(),
    });

    Authenticate();
  }

  submit(event) {
    event.preventDefault();
    ProfileActions.saveProfile(this.updateStateSubmit(this.state.profile));
    this.props.editProfile.call(null, false);
  }

  updateStateSubmit(profile) {
    profile.birthday = moment(profile.birthday, 'DD/MM/YYYY');
    profile.creationDate = moment(profile.creationDate, 'DD/MM/YYYY');
    return profile;
  }

  render() {
    return (
      <div className="profile-right-side">

        <h2><span>Resumo do perfil</span></h2>
        <div className="content-padding">
          <div>
            <div style={{"width":350}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Informação geral</span></h2>

              <ul className="profile-info">
                <li>
                  <span className="first">Nome:</span>
                  <input className={this.state.error && this.state.error.field == 'name' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','name'])}/>
                  {this.state.error && this.state.error.field == 'name' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Gênero:</span>
                  <select className={this.state.error && this.state.error.field == 'gender' ? "error-input" : ""}
                          type="text" valueLink={LinkWithState.call(this,['profile','gender'])}>
                    <option value="Homem">Homem</option>
                    <option value="Mulher">Mulher</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {this.state.error && this.state.error.field == 'gender' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Aniversário:</span>
                  <input
                    className={this.state.error && this.state.error.field == 'birthday' ? "error-input date" : "date"}
                    type="text" valueLink={LinkWithState.call(this,['profile','birthday'])}/>
                  {this.state.error && this.state.error.field == 'birthday' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Localização:</span>
                  <input className={this.state.error && this.state.error.field == 'location' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','location'])}/>
                  {this.state.error && this.state.error.field == 'location' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>

            <div style={{"width":370, marginLeft: 30}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Equipamentos</span></h2>

              <ul className="gear-info profile-info">
                <li>
                  <span className="first">Mouse:</span>
                  <input className={this.state.error && this.state.error.field == 'mouse' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','gear','mouse'])}/>
                  {this.state.error && this.state.error.field == 'mouse' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Sensibilidade mouse:</span>
                  <input className={this.state.error && this.state.error.field == 'mouseSens' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','gear','mouseSens'])}/>
                  {this.state.error && this.state.error.field == 'mouseSens' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Teclado:</span>
                  <input className={this.state.error && this.state.error.field == 'keyboard' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','gear','keyboard'])}/>
                  {this.state.error && this.state.error.field == 'keyboard' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Mousepad:</span>
                  <input className={this.state.error && this.state.error.field == 'mousepad' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','gear','mousepad'])}/>
                  {this.state.error && this.state.error.field == 'mousepad' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Headphone:</span>
                  <input className={this.state.error && this.state.error.field == 'headphone' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','gear','headphone'])}/>
                  {this.state.error && this.state.error.field == 'headphone' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
              </ul>
              <div className="clear-float"></div>
            </div>
          </div>
          <div>
            <div style={{"width":350}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Redes sociais</span></h2>

              <ul className="profile-info">
                <li>
                  <span className="first">Twitter:</span>
                  <input className={this.state.error && this.state.error.field == 'twitter' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','social','twitter'])}/>
                  {this.state.error && this.state.error.field == 'twitter' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Facebook:</span>
                  <input className={this.state.error && this.state.error.field == 'facebook' ? "error-input" : ""}
                          type="text" valueLink={LinkWithState.call(this,['profile','social','facebook'])}/>
                  {this.state.error && this.state.error.field == 'facebook' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Instagram:</span>
                  <input
                    className={this.state.error && this.state.error.field == 'instagram' ? "error-input" : ""}
                    type="text" valueLink={LinkWithState.call(this,['profile','social','instagram'])}/>
                  {this.state.error && this.state.error.field == 'birthday' ?
                  <span className="error-msg">{this.state.error.instagram}</span> : null}
                </li>
                <li>
                  <span className="first">TwitchTv:</span>
                  <input className={this.state.error && this.state.error.field == 'twitchtv' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','social','twitchtv'])}/>
                  {this.state.error && this.state.error.field == 'twitchtv' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">Youtube:</span>
                  <input className={this.state.error && this.state.error.field == 'youtube' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','social','youtube'])}/>
                  {this.state.error && this.state.error.field == 'youtube' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>

            <div style={{"width":370, marginLeft: 30}} className="left">
              <h2 style={{"marginLeft":-30}}><span>Redes jogos</span></h2>

              <ul className="gear-info profile-info">
                <li>
                  <span className="first">Steam:</span>
                  <input className={this.state.error && this.state.error.field == 'steam' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','game','steam'])}/>
                  {this.state.error && this.state.error.field == 'steam' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">BattleNet:</span>
                  <input className={this.state.error && this.state.error.field == 'battlenet' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','game','battlenet'])}/>
                  {this.state.error && this.state.error.field == 'battlenet' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
                <li>
                  <span className="first">LeagueOfLegends:</span>
                  <input className={this.state.error && this.state.error.field == 'leagueoflegends' ? "error-input" : ""}
                         type="text" valueLink={LinkWithState.call(this,['profile','game','leagueoflegends'])}/>
                  {this.state.error && this.state.error.field == 'leagueoflegends' ?
                  <span className="error-msg">{this.state.error.message}</span> : null}
                </li>
              </ul>

              <div className="clear-float"></div>
            </div>

            <div className="clear-float"></div>

            <p className="form-footer">
              <input type="submit" value="Salvar" onClick={this.submit.bind(this)}/>
            </p>
          </div>
        </div>
      </div>
    );
  }

}

export default ProfileEdition;
