import React, { Component } from 'react';

class WeekDuel extends Component {

  static propTypes = {};

  render() {
    return(
      <div className="panel">
        <h2>Duelo da semana</h2>
        <div className="panel-content">

          <div className="voting-line">
            <div className="voting-left" style={{"width":"70%"}}><span>70%</span></div>
            <div className="voting-right" style={{"width":"30%"}}><span>30%</span></div>
            <div className="clear-float"></div>
          </div>

          <div className="panel-duel">
            <div className="panel-duel-block" style={{"background":"url(images/photos/image-30.jpg) no-repeat center"}}>
              <span className="caption">BRTT</span>
            </div>
            <div className="panel-duel-block" style={{"background":"url(images/photos/image-31.jpg) no-repeat center"}}>
              <span className="caption">MYLON</span>
            </div>
            <div className="duel-versus"></div>
            <div className="clear-float"></div>
          </div>

          <div className="panel-duel-voting">
            <div className="panel-duel-vote">
              <a href="#">Votar</a>
            </div>
            <div className="panel-duel-vote">
              <a href="#">Votar</a>
            </div>
            <div className="clear-float"></div>
          </div>

        </div>
      </div>
    );
  }

}

export default WeekDuel;
