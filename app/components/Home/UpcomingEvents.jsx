import React, { Component } from 'react';

class UpcomingEvents extends Component {

  static propTypes = {};

  render() {
    return(
      <div className="content-wrapper">
        <h2><span>Eventos próximos</span></h2>
        <div className="content-padding">

          <div className="panel-games-lobby full-page">
            <ol>
              <li>
                <div className="lobby-block"
                     style={{'background':'url(images/photos/image-39.jpg) no-repeat center'}}>
                  <span className="caption">Nec liber molestie mediocritatem</span>
                  <div className="join-button">
                    <a href="events-single.html">View event page</a>
                  </div>
                </div>
                <div className="lobby-info">
                  <span className="right">14.May 2013, 20:00</span>
                  <span className="left"><b className="countdown-text" rel="1428482400">Loading..</b></span>
                  <div className="clear-float"></div>
                </div>
              </li>

              <li>
                <div className="lobby-block"
                     style={{"background":"url(images/photos/image-40.jpg) no-repeat center"}}>
                  <span className="caption">Ubique prodesset adversarium ad ius</span>
                  <div className="join-button">
                    <a href="events-single.html">View event page</a>
                  </div>
                </div>
                <div className="lobby-info">
                  <span className="right">20.May 2013, 20:00</span>
                  <span className="left"><b className="countdown-text" rel="1428882400">Loading..</b></span>
                  <div className="clear-float"></div>
                </div>
              </li>
            </ol>
            <div className="clear-float"></div>
          </div>
          <div style={{"marginTop":"-16px"}}>
            <a href="events.html" className="defbutton"><i className="fa fa-calendar"/>Ver todos próximos eventos</a>
          </div>
        </div>
      </div>

    );
  }

}

export default UpcomingEvents;
