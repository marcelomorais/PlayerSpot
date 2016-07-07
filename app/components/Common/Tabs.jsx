import React, { Component } from 'react';

class Tabs extends Component {

  renderTabs() {
    var tabStyle = {width: 90 /this.props.tabs.length + '%'};
    return this.props.tabs.map(function (tab, i) {
      return (<div onClick={this.props.selectTab.bind(null,tab.id)} style={tabStyle}
                   className={this.props.tab == tab.id ? "tab-active-default tab-option" : 'tab-option'} key={i}>
        <span>{tab.name}</span>
      </div>);
    }.bind(this));
  }

  shouldComponentUpdate(nextProps){
    return nextProps.tab !== this.props.tab;
  }

  render() {
    return (
      <div className="tab-menu-default">
        <ul>
          {this.renderTabs.call(this)}
        </ul>
      </div>
    );
  }

}

export default Tabs;
