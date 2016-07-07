import React, { Component } from 'react';

class LatestComments extends Component {

  static propTypes = {};

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-padding">
          <div className="panel-content no-padding">
            <h2 className="lastestComments-header"><span>Próximas Partidas</span></h2>

            <div className="new-forum-line">
              <a href="user-single.html" className="avatar online user-tooltip">
                <img src="images/photos/avatar-1.jpg" className="setborder" title="" alt=""/>
              </a>
              <a href="forum-single.html" className="f_content">
                <span className="sidebar-comments"><span>1</span></span>
                <strong>Mesarchum signiferumque sea eu no harum definiebas quo</strong>
                <span><b className="user-tooltip">marcisbee</b>, 20/12/2012</span>
              </a>
            </div>

            <div className="new-forum-line">
              <a href="user-single.html" className="avatar online user-tooltip">
                <img src="images/photos/avatar-2.jpg" className="setborder" title="" alt=""/>
              </a>
              <a href="forum-single.html" className="f_content">
                <span className="sidebar-comments inactive"><span>6</span></span>
                <strong>Lorem ipsum dolor sit amet usu at</strong>
                <span><b className="user-tooltip">minkka.</b>, 20/12/2012</span>
              </a>
            </div>

            <div className="new-forum-line">
              <a href="user-single.html" className="avatar offline user-tooltip">
                <img src="images/photos/avatar-3.jpg" className="setborder" title="" alt=""/>
              </a>
              <a href="forum-single.html" className="f_content">
                <span className="sidebar-comments"><span>21</span></span>
                <strong>Propriae senserit erroribus pro ea</strong>
                <span><b className="user-tooltip">Daviskrex</b>, 20/12/2012</span>
              </a>
            </div>

            <div className="new-forum-line">
              <a href="user-single.html" className="avatar online user-tooltip">
                <img src="images/photos/avatar-1.jpg" className="setborder" title="" alt=""/>
              </a>
              <a href="forum-single.html" className="f_content">
                <span className="sidebar-comments inactive"><span>103</span></span>
                <strong>Ne vis oblique nominavi honestatis mea ex minim nemore</strong>
                <span><b className="user-tooltip">marcisbee</b>, 20/12/2012</span>
              </a>
            </div>

            <div className="new-forum-line">
              <a href="user-single.html" className="avatar away user-tooltip">
                <img src="images/photos/avatar-4.jpg" className="setborder" title="" alt=""/>
              </a>
              <a href="forum-single.html" className="f_content">
                <span className="sidebar-comments inactive"><span>7</span></span>
                <strong>Cu quaeque repudiare per nisl partiendo ullamcorper per an</strong>
                <span><b className="user-tooltip">Paakjis</b>, 20/12/2012</span>
              </a>
            </div>

            <div className="new-forum-line">
              <a href="user-single.html" className="avatar away user-tooltip">
                <img src="images/photos/avatar-4.jpg" className="setborder" title="" alt=""/>
              </a>
              <a href="forum-single.html" className="f_content">
                <span className="sidebar-comments inactive"><span>7</span></span>
                <strong>Cu quaeque repudiare per nisl partiendo ullamcorper per an</strong>
                <span><b className="user-tooltip">Paakjis</b>, 20/12/2012</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default LatestComments;
