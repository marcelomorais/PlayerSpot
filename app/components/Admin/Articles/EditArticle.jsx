import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import jsxToString from 'jsx-to-string';
import AdminActions from '../../../actions/adminActions';
import ArticleStore from '../../../stores/articleStore';
import ArticleActions from '../../../actions/articleActions';
import AdminStore from '../../../stores/adminStore';
import GameStore from '../../../stores/gameStore';
import GameActions from '../../../actions/gameActions';
import LinkState, {LinkWithState} from '../../../mixins/LinkedStateMixin';
import _ from 'lodash';

class EditArticle extends Component {

  static propTypes = {};

  static defaultProps = {
    action: 'edit',
  };

  constructor(props) {
    super(props);
    if (this.props.articleId)
      ArticleActions.getArticleById(this.props.articleId);
    this.state = {
      article: {
        content: this.props.action == 'edit' ? null : '',
      },
    };
  }

  submit(event) {
    event.preventDefault();
    if (this.props.action == 'edit')
      AdminActions.saveArticle(this.state.article);
    else
      AdminActions.createArticle(this.state.article);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      article: {
        content: '',
      },
    });
  }

  componentWillMount() {
    this.saveListener = this.onSave.bind(this);
    this.loadListener = this.onLoad.bind(this);
    AdminStore.addChangeListener(this.saveListener);
    ArticleStore.addChangeListener(this.loadListener);
  }

  componentWillUnmount() {
    AdminStore.removeChangeListener(this.saveListener);
    ArticleStore.removeChangeListener(this.loadListener);
  }

  onSave() {
    this.setState({
      article: AdminStore.getArticle(),
    });
    if (!AdminStore.getError())
      this.props.selectTab(this.props.tabId);

  }

  onLoad() {
    this.setState({
      article: ArticleStore.getArticle(),
    });
  }

  handleEditorChange(e) {
    this.setState({
      article: this.updateArticle('content', e.target.getContent()),
    });
  }

  updateArticle(key, value) {
    var article = this.state.article;
    article[key] = value;
    return article;
  }

  onCheckChange(stateArray, e) {
    var mainProp = stateArray.shift();
    var newState = this.state[mainProp];

    stateArray.reduce(function (p, a) {
      if (a == _.last(stateArray))
        p[a] = e.target.checked;
      else
        return p[a];
    }, newState);

    var stateChange = {};
    stateChange[mainProp] = newState;
    this.setState(stateChange);
  }

  renderGames() {
    return this.props.games.map(game=> {
      return <option value={game.tag}>{game.name}</option>;
    });
  }

  handleFile(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function (upload) {
      this.setState({
        article: this.updateArticle('image', upload.target.result),
      });
    }.bind(this);

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div key={this.props.action}>
        <div>
          <div className="admin-article-left">
            <div className="admin-article">
              <span className="first">Título:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['article', 'title'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Subtitulo:</span>
              <input type="text" valueLink={LinkWithState.call(this, ['article', 'subtitle'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Jogo:</span>
              <select type="text" valueLink={LinkWithState.call(this, ['article', 'game'])}
                defaultValue=''>
                <option value="">Selecione um jogo</option>
                {this.renderGames()}
              </select>
            </div>
          </div>
          <div className="admin-article-left">
            <div className="admin-article">
              <span className="first">Rascunho:</span>
              <input type="checkbox" checked={this.state.article.draft}
                     onChange={this.onCheckChange.bind(this, ['article', 'draft'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Destaque:</span>
              <input type="checkbox" checked={this.state.article.best}
                     onChange={this.onCheckChange.bind(this, ['article', 'best'])}/>
            </div>

            <div className="admin-article">
              <span className="first">Tags:</span>
              <input type="textbox" valueLink={LinkWithState.call(this, ['article', 'tags'])}/>
            </div>
          </div>
          <div className="admin-article-left" style={{ marginTop: 20 }}>
            <div className="admin-article">
              <span className="first">Imagem:</span>
              <input type="file" onChange={this.handleFile.bind(this)}/>
            </div>

            <div className="admin-article">
              <span className="first">Url:</span>
              <input type="textbox" valueLink={LinkWithState.call(this, ['article', 'shortUrl'])}/>
            </div>
          </div>
        </div>

        {this.state.article.content != null ?
        <TinyMCE
          content={this.state.article.content}
          config={{
            height:500,
            plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste imagetools',
            ],
            toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter' +
              'alignright alignjustify | bullist numlist outdent indent | link image',
          }}
          onChange={this.handleEditorChange.bind(this)}
        /> : null}

        <input type="submit" value="Salvar" onClick={this.submit.bind(this)}
          style={{ marginTop: 20, float:'left' }}/>
      </div>
    );
  }

}

export default EditArticle;
