import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import jsxToString from 'jsx-to-string';
import AdminActions from '../../../actions/adminActions';
import ProfileActions from '../../../actions/profileActions';
import ProfileStore from '../../../stores/profileStore';
import {LinkWithState} from '../../../mixins/LinkedStateMixin';
import moment from 'moment';
import PagedList from '../../Common/PagedList';

class ListUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      username: '',
      admin: false,
      count: 0,
      currentPage: 1,
    };
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
      profiles: ProfileStore.getProfiles(),
      count: ProfileStore.getProfilesCount(),
    });
  }

  submit(event) {
    event.preventDefault();
    ProfileActions.getProfile(this.state.username, null, this.props.listMax);
  }

  renderUsers(user) {
    return (<li onClick={this.goToUserProfile.bind(this, user.user)}
    className="item" key={user._id}>
      <span className="podcast-li-nr">{user.user}</span>
        <span className="podcast-li-title">
          {user.admin ? <span className="pod-live"> ADMIN </span> : null}
          {user.banned ? <span className="pod-live"> BANNED </span> : null}
        </span>
      <span className="podcast-li-time">
          {moment(user.creationDate).format('DD/MM/YYYY')}
      </span>
    </li>);
  }

  changePage(page) {
    this.setState({
      currentPage: page,
    });
    ProfileActions.getProfile(this.state.user, null,
      this.props.listMax, this.props.listMax * (page - 1));
  };

  goToUserProfile(name, event) {
    event.preventDefault();
    location.hash = '/profile/' + name;
  }

  render() {
    return (
      <div>
        <div className="topBarArticle">
          <div className="admin-article">
            <span className="first">Nome:</span>
            <input type="text" valueLink={LinkWithState.call(this, ['user'])}/>
          </div>
          { this.state.error ?
            <p>
              <span className="the-error-msg">
                <i className="fa fa-warning"/>{this.state.error}
              </span>
          </p> : null}

          <input type="submit" value="Buscar" onClick={this.submit.bind(this)}
                 style={{ marginTop: 20, marginBottom: 20, display: 'table' }}/>
        </div>
        <div className="content-padding">
          <PagedList data={this.state.profiles} currentPage={this.state.currentPage}
             count={this.state.count}
             listMax={this.props.listMax}
             renderData={this.renderUsers.bind(this)} pageCallback={this.changePage.bind(this)}/>
        </div>
      </div>
    );
  }

}

export default ListUser;
