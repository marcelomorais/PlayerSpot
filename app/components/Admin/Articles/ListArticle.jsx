import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import jsxToString from 'jsx-to-string';
import AdminActions from '../../../actions/adminActions';
import ArticleActions from '../../../actions/articleActions';
import ArticleStore from '../../../stores/articleStore';
import {LinkWithState} from '../../../mixins/LinkedStateMixin';
import moment from 'moment'
import PagedList from '../../Common/PagedList'
import _ from 'lodash'

class ListArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      title: '',
      game: '',
      count: 0,
      currentPage: 1
    };
  }


  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    ArticleStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      articles: ArticleStore.getArticles(),
      count: ArticleStore.getArticlesCount()
    });
  }

  removeArticle(id,event){
    event.preventDefault();
    AdminActions.deleteArticle(id);
    ArticleActions.getArticles(this.state.title, this.state.game, null, this.props.listMax, this.props.listMax * (this.state.currentPage - 1));
  }

  submit(event) {
    event.preventDefault();
    ArticleActions.getArticles(this.state.title, this.state.game, null, this.props.listMax);
  }


  renderArticles(article) {
    return (<li className="item" key={article._id}>
      <span className="podcast-li-nr" onClick={this.editArticle.bind(this,article._id)}>{article.title}</span>
      <span className="podcast-li-nr">{article.game}</span>
        <span className="podcast-li-title">
          {article.draft ? <span className="pod-live"> DRAFT </span> : null}
          {article.best ? <span className="pod-live"> DESTAQUE </span> : null}
        </span>
      <span className="podcast-li-time">{moment(article.editionDate).format("DD/MM/YYYY HH:mm:ss")}</span>
      <span><a onClick={this.removeArticle.bind(this,article._id)}>X</a></span>
    </li>);
  }

  changePage(page) {
    this.setState({
      currentPage: page
    });
    ArticleActions.getArticles(this.state.title, this.state.game, null, this.props.listMax, this.props.listMax * (page - 1));
  };

  editArticle(id, event) {
    event.preventDefault();
    let EditArticle = this.props.editArticleComp;
    this.props.setRightComponent(<EditArticle action="edit" games={this.props.games} articleId={id} selectTab={this.props.selectTab}
                                              tabId={this.props.tabId}/>);
  }

  renderGames() {
    return _.map(this.props.games, game=> <option key={game._id} value={game.tag}>{game.name}</option>);
  }


  render() {
    return (
      <div>
        <div className="topBarArticle">
          <div className="admin-article">
            <span className="first">Título:</span>
            <input type="text" valueLink={LinkWithState.call(this,['title'])}/>
          </div>

          <div className="admin-article">
            <span className="first">Jogo:</span>
            <select type="text" valueLink={LinkWithState.call(this,['game'])} defaultValue=''>
              <option value=''>Selecione um jogo</option>
              {this.renderGames()}
            </select>
          </div>
          { this.state.error ? <p><span className="the-error-msg"><i
            className="fa fa-warning"/>{this.state.error}</span>
          </p> : null}

          <input type="submit" value="Buscar" onClick={this.submit.bind(this)}
                 style={{'marginTop': 20, 'marginBottom': 20, 'display': 'table'}}/>
        </div>
        <div className="content-padding">
          <PagedList data={this.state.articles} currentPage={this.state.currentPage} count={this.state.count}
                     listMax={this.props.listMax}
                     renderData={this.renderArticles.bind(this)} pageCallback={this.changePage.bind(this)}/>
        </div>
      </div>
    );
  }

}

export default ListArticle;
