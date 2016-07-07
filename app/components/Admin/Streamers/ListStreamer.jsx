import React, { Component } from 'react';
import AdminActions from '../../../actions/adminActions';
import StreamerActions from '../../../actions/streamActions';
import StreamerStore from '../../../stores/streamStore';
import {LinkWithState} from '../../../mixins/LinkedStateMixin';
import moment from 'moment';
import PagedList from '../../Common/PagedList';

class ListUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      currentPage: 1,
    };
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    StreamerStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    StreamerStore.removeChangeListener(this.changeListener);
  }

  onChange() {
    this.setState({
      streamers: StreamerStore.getStreamers(),
      count: StreamerStore.getStreamersCount(),
    });
  }

  submit(event) {
    event.preventDefault();
    StreamerActions.getStreamers(this.state.name, this.props.listMax);
  }

  renderStreamers(streamer) {
    return (<li onClick={this.editStreamer.bind(this, streamer._id)}
      className="item" key={streamer._id}>
      <span className="podcast-li-nr">{streamer.name}</span>
    </li>);
  }

  changePage(page) {
    this.setState({
      currentPage: page,
    });
    StreamerActions.getStreamers(this.state.name,
      this.props.listMax, this.props.listMax * (page - 1));
  };

  editStreamer(id, streamer) {
    event.preventDefault();
    let EditStreamer = this.props.editStreamerComp;
    this.props.setRightComponent(<EditStreamer streamerId={id}
      selectTab={this.props.selectTab} tabId={this.props.tabId}  games={this.props.games}/>);
  }

  render() {
    return (
      <div>
        <div className="topBarArticle">
          <div className="admin-article">
            <span className="first">Nome:</span>
            <input type="text" valueLink={LinkWithState.call(this, ['name'])}/>
          </div>
          { this.state.error ? <p><span className="the-error-msg"><i
            className="fa fa-warning"/>{this.state.error}</span>
          </p> : null}
          <input type="submit" value="Buscar" onClick={this.submit.bind(this)}
            style={{ marginTop: 20, marginBottom: 20, display: 'table' }}/>
        </div>
        <div className="content-padding">
          <PagedList data={this.state.streamers} currentPage={this.state.currentPage}
            count={this.state.count} listMax={this.props.listMax}
            renderData={this.renderStreamers.bind(this)} pageCallback={this.changePage.bind(this)}/>
        </div>
      </div>
    );
  }

}

export default ListUser;
