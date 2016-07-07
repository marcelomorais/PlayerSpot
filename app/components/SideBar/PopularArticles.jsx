import React, { Component } from 'react';

class PopularArticles extends Component {

  static propTypes = {};

  render() {
    return (
      <div className="panel">
        <h2>Artigos Populares</h2>
        <div className="top-right"><a href="#">Ver todos</a></div>
        <div className="panel-content">

          <div className="d-articles">
            <div className="item">
              <div className="item-header">
                <a href="#"><img src="images/photos/image-95.jpg" alt=""/></a>
              </div>
              <div className="item-content">
                <h4><a href="post.html">Fermentum hac consectetur</a></h4>
                <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
              </div>
            </div>
            <div className="item">
              <div className="item-header">
                <a href="post.html"><img src="images/photos/image-96.jpg" alt=""/></a>
              </div>
              <div className="item-content">
                <h4><a href="post.html">Fermentum hac consectetur</a></h4>
                <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
              </div>
            </div>
            <div className="item">
              <div className="item-header">
                <a href="post.html"><img src="images/photos/image-97.jpg" alt=""/></a>
              </div>
              <div className="item-content">
                <h4><a href="post.html">Fermentum hac consectetur</a></h4>
                <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
              </div>
            </div>
            <div className="item">
              <div className="item-header">
                <a href="post.html"><img src="images/photos/image-98.jpg" alt=""/></a>
              </div>
              <div className="item-content">
                <h4><a href="post.html">Fermentum hac consectetur</a></h4>
                <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
              </div>
            </div>
            <div className="item">
              <div className="item-header">
                <a href="#"><img src="images/photos/image-99.jpg" alt=""/></a>
              </div>
              <div className="item-content">
                <h4><a href="post.html">Fermentum hac consectetur</a></h4>
                <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default PopularArticles;
