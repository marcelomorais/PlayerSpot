import React, { Component } from 'react';
import ProfileStore from '../../stores/profileStore';
import AccountStore from '../../stores/accountStore';
import ProfileActions from '../../actions/profileActions';
import AdminActions from '../../actions/adminActions';
import ListWrapper from '../../mixins/ListWrapper';
import ProfileSummary from './ProfileSummary';
import ProfileSideBar from './ProfileSideBar';
import ProfileEdition from './ProfileEdition';
import moment from 'moment';

class Profile extends Component {

  static propTypes = {
    user: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      profile: {
        friends: [],
        achievements: [],
        gear: {},
        social: {},
        game: {}
      },
      edit: false,
      user: AccountStore.getUser(),
      admin: AccountStore.getAdmin(),
      profileInfo: 1
    };
    ProfileActions.getProfile(this.props.params.user);
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    this.userListener = this.userChange.bind(this);
    ProfileStore.addChangeListener(this.changeListener);
    AccountStore.addChangeListener(this.userListener);
  }

  componentWillUnmount() {
    ProfileStore.removeChangeListener(this.changeListener);
    AccountStore.removeChangeListener(this.userListener);
  }

  componentWillReceiveProps(nextProps) {
    ProfileActions.getProfile(nextProps.params.user);
  }

  onChange() {
    this.setState({
      profile: this.updateStateChange(ProfileStore.getProfile())
    });
  }

  userChange() {
    this.setState({
      user: AccountStore.getUser(),
      admin: AccountStore.getAdmin()
    });
  }

  updateStateChange(profile) {
    if (profile) {
      if (profile.birthday)
        profile.birthday = moment(profile.birthday).format('DD/MM/YYYY');
      profile.creationDate = moment(profile.creationDate).format('DD/MM/YYYY');
      return profile;
    }
  }

  changeBan(ban, event) {
    event.preventDefault();
    AdminActions.changeBanUser(this.props.params.user, ban);
  }


  editProfile(edit, event) {
    if (event)
      event.preventDefault();
    this.setState({
      edit: edit
    })
  }

  changeProfileInfo(info, event) {
    if (event)
      event.preventDefault();
    this.setState({
      profileInfo: info
    })
  }

  render() {
    return (
      <div id="main">
        {this.state.profile ?
          <div className="user-profile">
            <div className="profile-shadow"></div>
            <ProfileSideBar currentUser={this.state.user} admin={this.state.admin} changeBan={this.changeBan.bind(this)}
                            editProfile={this.editProfile.bind(this)} {...this.props} profile={this.state.profile}
                            changeProfileInfo={this.changeProfileInfo.bind(this)}/>
            { this.state.edit ? <ProfileEdition {...this.state.profile} editProfile={this.editProfile.bind(this)}/> :
              <ProfileSummary user={this.state.user} profileInfo={this.state.profileInfo}
                              maxFriendsShow={this.props.maxFriendsShow} {...this.state.profile}/>}
            <div className="clear-float"></div>
          </div>
          : <div className="user-notfound"><h2>Usuário não encontrado</h2></div>}
      </div>
    );
  }

}

export default Profile;
