import React, { Component } from 'react';
import {LinkWithState} from '../../mixins/LinkedStateMixin';
import ProfileActions from '../../actions/profileActions';
import moment from 'moment';
import {handleFile} from '../../mixins/InputMixin'

class ProfileSideBar extends Component {

  goTop(event) {
    event.preventDefault();
    location.hash += "#top";
  }

  changeAvatar(event) {
    event.preventDefault();
    $("#avatarInput").click();
  }

  saveAvatar(upload) {
    let profile = this.props.profile;
    profile.image = upload.target.result;
    ProfileActions.saveProfile(this.updateStateSubmit(profile));
  }

  updateStateSubmit(profile) {
    profile.birthday = moment(profile.birthday, 'DD/MM/YYYY');
    profile.creationDate = moment(profile.creationDate, 'DD/MM/YYYY');
    return profile;
  }

  render() {
    return (
      <div className="profile-left-side">

        <div className="the-profile-top">
          <div className="profile-user-name">
            <h1>{this.props.profile.user}</h1>
          </div>

          <div className={this.props.profile.banned? "avatar banned" : "avatar online"}>
            <input id='avatarInput' type="file" style={{'display':'none'}}
                   onChange={handleFile.bind(this, this.saveAvatar)}/>
            { this.props.currentUser == this.props.params.user || this.props.admin ?
            <div className="avatar-button"><a href="#" onClick={this.changeAvatar}><i className="fa fa-camera-retro"/>Mudar
              foto</a>
            </div>
              :null}
            <img src={this.props.profile.image} width="220" height="220" className="setborder" alt=""/>
          </div>

          <div>
            <div className="user-panel-about">

              <div className="user-achievements">
                <b><i className="fa fa-trophy"/>My achievements</b>
                <p>
                        <span className="ach strike-tooltip" title="Joined Revelio"><i
                          className="fa fa-unlock-alt"/></span>
                        <span className="ach strike-tooltip" title="Here from beginning"><i
                          className="fa fa-bar-chart-o"/></span>
                        <span className="ach strike-tooltip" title="Active on forums"><i
                          className="fa fa-comments-o"/></span>
                        <span className="ach strike-tooltip" title="Writes a lot"><i
                          className="fa fa-keyboard-o"/></span>
                        <span className="ach strike-tooltip" title="Admin aproved"><i
                          className="fa fa-thumbs-up"/></span>
                        <span className="ach strike-tooltip" title="Helps everyone"><i
                          className="fa fa-medkit"/></span>
                  <span className="ach strike-tooltip" title="Night owl"><i className="fa fa-moon-o"/></span>
                        <span className="ach strike-tooltip" title="Comes and plays"><i
                          className="fa fa-gamepad"/></span>
                </p>
              </div>
            </div>

            <ul className="user-button-list">
              { this.props.currentUser == this.props.params.user || this.props.admin ?
              <li><a href="#" onClick={this.props.editProfile.bind(null,true)} className="defbutton profile-button">
                <i className="fa fa-wrench"/>Mudar informações do perfil</a></li>
                : null }
              { this.props.admin && !this.props.profile.banned ?
              <li><a href="#" className="defbutton profile-button" onClick={this.props.changeBan.bind(null,true)}><i
                className="fa fa-ban"/>Ban this
                user</a></li>
                : null }
              { this.props.admin && this.props.profile.banned ?
              <li><a href="#" className="defbutton profile-button" onClick={this.props.changeBan.bind(null,false)}><i
                className="fa fa-ban"/>Unban this
                user</a></li>
                : null }
            </ul>
          </div>
        </div>

        <div className="the-profile-navi">
          <ul className="profile-navi">
            <li className="active"><a href='#' onClick={this.props.changeProfileInfo.bind(null,1)}><i
              className="fa fa-globe"/>Informações do perfil</a></li>
            <li className="active"><a href='#' onClick={this.props.changeProfileInfo.bind(null,2)}><i
              className="fa fa-group"/>Informações competitivas</a></li>
          </ul>
        </div>
      </div>
    );
  }

}

export default ProfileSideBar;
