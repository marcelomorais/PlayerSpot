import React, { Component } from 'react';
import _ from 'lodash';
class TopRatedArticles extends Component {

  static propTypes = {};

  renderOtherArticles() {
    let htmlNews = _.map(_.rest(this.props.articles), article=> {
      let articleGame = _.find(this.props.games, game => article.game == game.tag);
      if (!articleGame)
        return null;
      let link = "/#/article/" + articleGame.url + "/" + article.shortUrl;
      return (
        <li key={article._id}>
          <a href={link}>
            <span className="image-comments"><span>{article.upvotes || "0"}</span></span>
            <img src={article.image} alt="" title=""/>
            <strong>{article.title}</strong>
            <span className="a-txt">{article.subtitle}</span>
          </a>
        </li>);
    });
    return (
      <div className="home-article center">
        <ul>
          {htmlNews}
        </ul>
        <div>
          <a href="#" className="defbutton"><i className="fa fa-reply"/>Ver mais notícias</a>
        </div>
      </div>
    )
  }

  renderFirstArticle() {
    var firstArticle = _.first(this.props.articles);
    if (!firstArticle)
      return null;
    let articleGame = _.find(this.props.games, game => firstArticle.game == game.tag),
      link = "/#/article/" + articleGame.url + "/" + firstArticle.shortUrl;
    return (
      <div className="home-article left">
								<span className="article-image-out article-image-out-first">
									<span className="image-comments"><span>{firstArticle.upvotes || "0"}</span></span>
									<span className="article-image">
										<span className="nth1 strike-tooltip" title="Ler notícia">
											<a href={link}><i className="fa fa-eye"/></a>
										</span>
										<span className="nth2 strike-tooltip" title="Save to read later">
											<a href="#"><i className="fa fa-plus"/></a>
										</span>
										<a href={link}><img src={firstArticle.image} alt="" title=""/></a>
									</span>
								</span>
        <h3><a href={link}>{firstArticle.title}</a></h3>
        <p>{firstArticle.subtitle}</p>
        <div>
          <a href={link} className="defbutton"><i className="fa fa-reply"/>Ler notícia completa</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-padding">
          <h2 className="topRated-header"><span>Melhores Notícias</span></h2>
          {this.renderFirstArticle()}
          {this.renderOtherArticles()}
          <div className="clear-float"></div>
        </div>
      </div>
    );
  }

}

export default TopRatedArticles;
