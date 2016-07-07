import React, { Component } from 'react';
import _ from 'lodash';

class LatestArticles extends Component {

  static propTypes = {};

  renderLastArticles() {
    let htmlLastArticles = _.map(this.props.articles, article=> {
      return (
        <div className="item" key={article._id}>
          <span className="article-image-out">
            <span className="image-comments"><span>{article.upvotes || "0"}</span></span>
            <span className="article-image">
              <span className="nth1 strike-tooltip" title="Ler notícia">
                <a href="post.html"><i className="fa fa-eye"/></a>
              </span>
              <span className="nth2 strike-tooltip" title="Save to read later">
                <a href="#"><i className="fa fa-plus"/></a>
              </span>
              <a href="post.html"><img src={article.image} alt="" title=""/></a>
            </span>
          </span>
          <h3><a href="post.html">{article.title}</a></h3>
          <p>{article.subtitle}</p>
          <div>
            <a href="post.html" className="defbutton"><i className="fa fa-reply"/>Let notícia completa</a>
          </div>
        </div>
      )
    });
    return (
      <div className="grid-articles">
        {htmlLastArticles}
      </div>
    )
  }

  render() {
    return (
      <div className="content-wrapper">
        <h2><span>Últimas Notícias</span></h2>
        <div className="content-padding">
          {this.renderLastArticles()}
        </div>
      </div>
    );
  }

}

export default LatestArticles;
