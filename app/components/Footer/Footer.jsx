import React, { Component } from 'react';

class ImageSlider extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    return (
      <div className="footer">

        <div className="footer-top"></div>

        <div className="footer-content">
          <div className="panel">
            <h2>Destaques</h2>
            <div className="top-right"><a href="#">Ver todos</a></div>
            <div className="panel-content">

              <div className="d-articles">
                <div className="item">
                  <div className="item-header">
                    <a href="/#/post"><img src="images/photos/image-96.jpg" alt=""/></a>
                  </div>
                  <div className="item-content">
                    <h4><a href="post">Fermentum hac consectetur</a></h4>
                    <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
                  </div>
                </div>
                <div className="item">
                  <div className="item-header">
                    <a href="/#/post"><img src="images/photos/image-97.jpg" alt=""/></a>
                  </div>
                  <div className="item-content">
                    <h4><a href="post">Fermentum hac consectetur</a></h4>
                    <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
                  </div>
                </div>
                <div className="item">
                  <div className="item-header">
                    <a href="/#/post"><img src="images/photos/image-98.jpg" alt=""/></a>
                  </div>
                  <div className="item-content">
                    <h4><a href="/#/post">Fermentum hac consectetur</a></h4>
                    <p>Sagittis ut eleifend taciti eleifend, mauris primis...</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="panel">
            <h2>Informação de contato</h2>
            <div className="panel-content">

              <div>
                <h4>What do we stand for ?</h4>
                <p>Soleat aperiam ex pri, at pericula constituam efficiantu per, voluptaria intellegam eu nec. Duo modus
                  homero vivendum an, facete timeam ne eum.</p>

                <a href="mailto:contato@psbr.com.br" className="icon-line">
                  <i className="fa fa-comment"/><span>contato@psbr.com.br</span>
                </a>

								<span className="icon-line">
									<i className="fa fa-map-marker"/><span>949 West Grassland Drive, UT 84003</span>
								</span>

              </div>

            </div>
          </div>

          <div className="panel">
            <h2>Tag Cloud</h2>
            <div className="panel-content">

              <div className="tagcloud">
                <a href="#">sapien</a><a href="#">scelerisque</a><a href="#">sed</a><a href="#">sem</a><a href="#">senectus</a><a
                href="#">sit</a><a href="#">sodales</a><a href="#">sollicitudin</a><a href="#">tellus</a><a href="#">tempus</a><a
                href="#">tincidunt</a><a href="#">tristique</a><a href="#">ullamcorper</a><a href="#">urna</a><a
                href="#">ut</a><a href="#">varius</a><a href="#">vel</a><a href="#">vivamus</a><a href="#">viverra</a><a
                href="#">volutpat</a>
              </div>

            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="left">&copy; Copyright 2016 <strong>PlayerSpot Brasil</strong> All rights reserved
          </div>
          <div className="right">
            <ul>
              <li><a href="/#/">Homepage</a></li>
              <li><a href="/#/blog">Blog Page</a></li>
              <li><a href="/#/photo-gallery">Photo Gallery</a></li>
              <li><a href="/#/about">About</a></li>
            </ul>
          </div>
          <div className="clear-float"></div>
        </div>
      </div>
    )
  }

}
export default ImageSlider;
