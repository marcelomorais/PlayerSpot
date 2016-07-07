import React, { Component } from 'react';
import StreamList from './StreamList';
import SocialPanel from './SocialPanel';
import PopularArticles from './PopularArticles';
import RafllePanel from './RafllePanel';
import WeekDuel from './WeekDuel';
import LatestComments from './LatestComments';
import ContactInformation from './ContactInformation';
import GoogleAds from '../Common/GoogleAds';
class SideBar extends Component {

  static propTypes = {streams: React.PropTypes.array};


  render() {
    return (
      <div id="sidebar">
        <RafllePanel/>
        <StreamList {...this.props} />
        <div className="panel">
          <h2>Publicidade</h2>
          <div className="panel-content">
            <GoogleAds client="ca-pub-4272356824867386" slot="1872536958" width="300" height="250"
                       display="inline-block"/>
          </div>
        </div>
      </div>
    )
  }
}


export default SideBar
