import React, { Component } from 'react';

class RafllePanel extends Component {

  static propTypes = {};

  render() {
    return(
      <div className="panel">
        <h2>Sorteio da semana</h2>
        <div className="panel-content">
          <div className="donation-widget">
            <p><b>Tema sorteado:</b> League of Legends</p>
            <hr />
            <div className="donation-stats">
              <h3>Prêmio: <span className="value">40k RP</span></h3>
              <div className="progress-bar">
                <div className="border-bar">
                  <div className="the-progress" style={{"width": "5%"}}><strong>6 dias restantes</strong></div>
                </div>
              </div>
              <a href="#" target="_blank" className="button">Participar</a>
            </div>
          </div>

        </div>
      </div>
    );
  }

}

export default RafllePanel;
