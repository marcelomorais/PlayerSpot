import React, { Component } from 'react';

class NoMatch extends Component {

  static propTypes = {};

  render() {
    return(
      <div id="main">
        <div className="big-message">
          <h3>404</h3>
          <div>
            <h4>Página não encontrada</h4>
          </div>
          <p>Acho que alguém se perdeu por aí...<br/>Ou nós perdemos o que você procura! Desculpe :(</p>
          <div className="msg-menu">
            <a href="/#/">Voltar a página inicial</a>
          </div>
        </div>
      </div>
    );
  }

}

export default NoMatch;
