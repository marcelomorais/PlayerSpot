import React, { Component } from 'react';
import TopRatedArticles from './TopRatedArticles';
import LatestArticles from './LatestArticles';
import LatestComments from '../SideBar/LatestComments'
import UpcomingEvents from './UpcomingEvents';
import RecentPodcasts from './RecentPodcasts';
import GoogleAds from '../Common/GoogleAds';

import BasicDataStore from '../../stores/basicDataStore';
import InitializeActions from '../../actions/initializeActions';
import _ from 'lodash'


class Home extends Component {

  static propTypes = {
    topRatedAmount: React.PropTypes.number
  };
  static defaultProps = {topRatedAmount: 7, lastArticlesAmount: 6};

  constructor(props) {
    super(props);
    var game = props.params.game;
    this.state = {
      topRatedArticles: [],
      game: game
    };
    InitializeActions.initApp(game);
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    BasicDataStore.addChangeListener(this.changeListener);
  }

  componentWillReceiveProps() {
    var game = this.props.params.game;
    InitializeActions.initApp(game);
    this.setState({
      game: this.props.params.game
    })
  }

  componentWillUnmount() {
    BasicDataStore.removeChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      streams: BasicDataStore.getAllStreams(),
      topRatedArticles: _.take(BasicDataStore.getAllTopRatedArticles(), this.props.topRatedAmount),
      lastArticles: _.take(BasicDataStore.getLastArticles(), this.props.lastArticlesAmount),
      games: BasicDataStore.getGames()
    });
  }

  render() {
    return (
      <div id="main">
        <GoogleAds client="ca-pub-4272356824867386" slot="4047274153" format="auto" width="1100" height="110"
                   position="initial" display="block"/>
      </div>);
  }

}

export default Home;
