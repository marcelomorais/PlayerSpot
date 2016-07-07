import React, { Component } from 'react';
import TopRatedArticles from '../Home/TopRatedArticles';
import LatestArticles from '../Home/LatestArticles';
import UpcomingEvents from '../Home/UpcomingEvents';
import RecentPodcasts from '../Home/RecentPodcasts';
import GoogleAds from '../Common/GoogleAds';

import ArticleStore from '../../stores/articleStore';
import ArticleActions from '../../actions/articleActions';
import GameActions from '../../actions/gameActions';
import GameStore from '../../stores/gameStore';

import NoArticlesGame from '../NoMatch/NoArticlesGame.jsx';
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
    GameActions.getGames();
    ArticleActions.getArticles(null,game);
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    this.loadGames = this.onGamesLoad.bind(this);
    ArticleStore.addChangeListener(this.changeListener);
    GameStore.addChangeListener(this.loadGames);
  }

  componentWillReceiveProps(nextProps) {
    var game = nextProps.params.game;
    ArticleActions.getArticles(null, game);
    this.setState({
      lastArticles: null,
      game: nextProps.params.game
    })
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.changeListener);
  }

  onGamesLoad(){
    this.setState({
      games: GameStore.getGames()
    });
  }

  onChange() {
    this.setState({
      topRatedArticles: _.take(ArticleStore.getAllTopRatedArticles(), this.props.topRatedAmount),
      lastArticles: _.take(ArticleStore.getLastArticles(), this.props.lastArticlesAmount),
    });
  }

  render() {
    if(this.state.lastArticles && this.state.lastArticles.length == 0)
      return <NoArticlesGame game={this.state.game}/>
    return (
      <div id="main">
        <GoogleAds client="ca-pub-4272356824867386" slot="4047274153" format="auto" width="1100" height="110"
                   position="initial" display="block"/>
        <TopRatedArticles articles={this.state.topRatedArticles} games={this.state.games}/>
        <LatestArticles articles={this.state.lastArticles}/>
        <UpcomingEvents/>
      </div>);
  }

}

export default Home;
