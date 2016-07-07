import React, { Component } from 'react';

class RecentPodcasts extends Component {

  static propTypes = {};

  render() {
    return(
      <div className="content-wrapper">
        <h2><span>Entrevistas recentes</span></h2>
        <div className="content-padding">

          <div className="podcast-list">
            <a href="podcasts-single.html" className="item podcast-live">
              <span className="podcast-li-nr">#23</span>
                <span className="podcast-li-title"><span className="pod-live">AO VIVO</span>Entrevista ao vivo / 20.Maio 2015
                  <strong>Informações adicionais</strong></span>
              <span className="podcast-li-time">00:17:32</span>
            </a>
            <a href="podcasts-single.html" className="item">
              <span className="podcast-li-nr">#22</span>
                <span
                  className="podcast-li-title">Entrevista2/ 13.Maio 2015</span>
              <span className="podcast-li-time">01:30:01</span>
            </a>
            <a href="podcasts-single.html" className="item">
              <span className="podcast-li-nr">#21</span>
                <span
                  className="podcast-li-title">Entrevista3/ 6.Maio 2015</span>
              <span className="podcast-li-time">01:30:01</span>
            </a>
            <a href="podcasts-single.html" className="item">
              <span className="podcast-li-nr">#20</span>
              <span className="podcast-li-title">Entrevista4/ 2.Maio 2015</span>
              <span className="podcast-li-time">01:30:01</span>
            </a>
          </div>
          <div>
            <center><a href="podcasts.html" className="defbutton"><i className="fa fa-microphone"/>Ver mais entrevistas</a>
            </center>
          </div>
        </div>
      </div>
    );
  }

}

export default RecentPodcasts;
