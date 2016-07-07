import React, { Component } from 'react';

class ListWrapper extends Component {
  render() {
    return <li className={this.props.className}>{this.props.content}</li>;
  }
}

export default ListWrapper;
