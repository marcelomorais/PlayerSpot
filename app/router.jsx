import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute,hashHistory } from 'react-router';
import App from './components/App/App';
import InitializeActions from './actions/initializeActions';
import Login from './components/Account/Login';
import Home from './components/Home/Home';
import SignUp from './components/Account/SignUp';
import Admin from './components/Admin/Admin';
import Profile from './components/Profile/Profile';
import AccountStore from './stores/accountStore';
import Article from './components/Article/Article';
import Stream from './components/Stream/Stream';
import NoMatch from './components/NoMatch/NoMatch';
import GamesHome from './components/Game/Home.jsx';
import moment from 'moment';


render((
  <Router history={hashHistory}>
    <Route name="" path="/" component={App} admin={true}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login}/>
      <Route path="signup" component={SignUp}/>
      <Route path="profile/:user" component={Profile} maxFriendsShow={6} headerDown={true}/>
      <Router path="article/:game/:url" component={Article}/>
      <Router path="stream/:channel" component={Stream}/>
      <Router path="game/:game" component={GamesHome}/>
    </Route>
    <Route path="admin" component={Admin}/>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));
