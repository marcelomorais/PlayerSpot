import React, { Component } from 'react';

class ContactInformation extends Component {

  static propTypes = {};

  render() {
    return (
      <div className="panel">
        <h2>Informações de contato</h2>
        <div className="panel-content">
          <div>
            <h4>Contato geral</h4>
            <p>Para parcerias, anúncios, eventos dentro outros assunto utilize o contato abaixo</p>
            <a href="mailto:contato@psbr.com.br" className="icon-line">
              <i className="fa fa-comment"/><span>contato@psbr.com.br</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

export default ContactInformation;
