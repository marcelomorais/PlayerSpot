import React, { Component } from 'react';
import _ from 'lodash';

class AdminLeft extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = ({
      tab: _.find(this.props.tabs, function (tab) {
        return tab.id == this.props.tab;
      }.bind(this)),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tab: _.find(this.props.tabs, function (tab) {
        return tab.id == nextProps.tab;
      }),
    });
  }

  renderButtons() {
    if (!this.state.tab.buttons)
      return;
    return this.state.tab.buttons.map(function (button, i) {
      return (
        <a href="#" className="defbutton green" key={i}
           onClick={this.props.setRightComponent.bind(null, button.component)}>
           <i className={'fa ' + button.icon }/>{button.text}
        </a>
      );
    }.bind(this));
  }

  render() {
    return (
      <div className="game-info-left admin-left">
        <div className="game-info-details">
          <div className="game-info-buttons">
            {this.renderButtons()}
          </div>
        </div>
      </div>
    );
  }

}

export default AdminLeft;
