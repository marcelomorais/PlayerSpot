import React, { Component } from 'react';
import ArticleActions from '../../actions/articleActions';
import ArticleStore from '../../stores/articleStore';
import AccountStore from '../../stores/accountStore'

class Article extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    ArticleActions.getArticleByUrl(this.props.params.url);
    this.state = {
      article: null
    }
  }

  componentWillMount() {
    this.loadListener = this.onLoad.bind(this);
    this.userListener = this.onUserChange.bind(this);
    ArticleStore.addChangeListener(this.loadListener);
    AccountStore.addChangeListener(this.userListener);
  }


  componentWillUnmount() {
    ArticleStore.removeChangeListener(this.loadListener);
    AccountStore.removeChangeListener(this.userListener);
  }

  onUserChange() {
    this.setState({
      user: AccountStore.getUser(),
      admin: AccountStore.getAdmin()
    });
  }

  onLoad() {
    this.setState({
      article: ArticleStore.getArticle()
    });
  }


  renderArticle() {
    let article = this.state.article;
    if (!article)
      return null;
    return (
      <div>
        <h2 className="article-title"><span>{article.title}</span></h2>
        <div className="content-padding">

          <div className="article-full">
            <div className="article-main-photo">
              <img src={article.image} alt="" title=""/>
            </div>
            <div className="article-icons">
              <a href={"/#/profile/" + article.user} className="user-tooltip"><i className="fa fa-fire"/>{article.user}
              </a>
              <a href="#"><i className="fa fa-calendar"/>September 11, 2012</a>
              <a href="#" className="show-likes"><i className="fa fa-heart"/>{article.upvotes || "0"} likes</a>
            </div>

            <div className="clear-float do-the-split"></div>

            <div className="article-content" dangerouslySetInnerHTML={{__html: article.content }}>

            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div id="main">
        {this.renderArticle()}
        <h2 className="article-title"><span>Comments (3)</span></h2>
        <div className="content-padding">

          <div className="comment-part">

            <ol id="comments">
              <li>
                <div className="comment-inner">
                  <div className="comment-avatar">
                    <img
                      src="http://1.gravatar.com/avatar/b1c65c520efb9520269584aae4323fae?s=73&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D73&amp;r=G"
                      alt="DatCouch"/>
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h3><a href="#">DatCouch</a></h3>
                    </div>
                    <p>Lorem ipsum dolor sit amet, ea rebum aeterno qui, cum tale dicta nihil id. Ex eam simul altera.
                      Te sea labores persequeris. An suscipit menandri vel, est error nullam dictas ne. Debet
                      instructior ea pri, vis singulis antiopam consulatu ex.</p>
                    <a className="comment-reply-link post-a" href="#"><i
                      className="fa fa-comment"/><strong>Reply</strong></a>
                    <span className="post-a"><i className="fa fa-calendar-o"/> May 2, 2014</span>
                  </div>
                </div>
                <ul>
                  <li>
                    <div className="comment-inner">
                      <div className="comment-avatar">
                        <img
                          src="http://1.gravatar.com/avatar/b1c65c520efb9520269584aae4323fae?s=73&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D73&amp;r=G"
                          alt="DatCouch"/>
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <h3><a href="#">DatCouch</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, ea rebum aeterno qui, cum tale dicta nihil id. Ex eam simul
                          altera. Te sea labores persequeris. An suscipit menandri vel, est error nullam dictas ne.
                          Debet instructior ea pri, vis singulis antiopam consulatu ex.</p>
                        <a className="comment-reply-link post-a" href="#"><i
                          className="fa fa-comment"/><strong>Reply</strong></a>
                        <span className="post-a"><i className="fa fa-calendar-o"/> May 2, 2014</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <div className="comment-inner">
                  <div className="comment-avatar">
                    <img
                      src="http://1.gravatar.com/avatar/b1c65c520efb9520269584aae4323fae?s=73&amp;d=http%3A%2F%2F1.gravatar.com%2Favatar%2Fad516503a11cd5ca435acc9bb6523536%3Fs%3D73&amp;r=G"
                      alt="DatCouch"/>
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <h3><a href="#">DatCouch</a></h3>
                    </div>
                    <p>Lorem ipsum dolor sit amet, ea rebum aeterno qui, cum tale dicta nihil id. Ex eam simul altera.
                      Te sea labores persequeris. An suscipit menandri vel, est error nullam dictas ne. Debet
                      instructior ea pri, vis singulis antiopam consulatu ex.</p>
                    <a className="comment-reply-link post-a" href="#"><i
                      className="fa fa-comment"/><strong>Reply</strong></a>
                    <span className="post-a"><i className="fa fa-calendar-o"/> May 2, 2014</span>
                  </div>
                </div>
              </li>
            </ol>
            <div className="comments-pager"></div>

            <div className="comment-form">
              <a href="#" name="respond"></a>
              <div id="respond" className="comment-respond">
                <h3 id="reply-title" className="comment-reply-title">
                  <small><a rel="nofollow" id="cancel-comment-reply-link" href="/integer-nam-varius/#respond"
                            style={{'display':'none'}}>Cancel reply</a></small>
                </h3>
                {AccountStore.getToken() ?
                  <form action="http://chronicles.datcouch.com/wp-comments-post.php" method="post" id="commentform"
                        className="comment-form">
                    <p className="form-comment">
                      <label for="comment">Comment:<span className="required">*</span></label>
                      <textarea id="comment" name="comment" type="text" aria-required="true"
                                placeholder="Comment Text"></textarea>
                    </p>
                    <p className="form-submit">
                      <input name="submit" type="submit" id="submit" value="Post Comment" className="button"/>
                    </p>
                  </form>
                  : null}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

}

export default Article;
