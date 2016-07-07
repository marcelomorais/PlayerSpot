import React, { Component } from 'react';

class AdminTabs extends Component {

  renderTabs() {
    return this.props.tabs.map(function (tab, i) {
      return (<li className={this.props.tab == tab.id ? 'active active-tab' : ''} key={i}>
        <a href="#" onClick={this.props.selectTab.bind(null, tab.id)}>
          &nbsp;&nbsp;{tab.name}
        </a>
      </li>);
    }.bind(this));
  }

  render() {
    return (
      <div className="game-menu" style={{ borderBottom: '5px solid #921913' }}>
        <div className="game-overlay-info">
          <h1>PAINEL ADMINISTRAÇÃO</h1>
          <span> Use com cuidado e carinho :) </span>
        </div>
        <ul>
          {this.renderTabs.call(this)}
        </ul>
      </div>
    );
  }

}

export default AdminTabs;
