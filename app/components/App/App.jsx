import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import InitializeActions from '../../actions/initializeActions'
import Home from '../Home/Home'
import SideBar from '../SideBar/SideBar';
import TopBar from '../TopBar/TopBar'
import Header from '../Header/Header'
import ImageSlider from '../ImageSlider/ImageSlider'
import Footer from '../Footer/Footer'
import BasicDataStore from '../../stores/basicDataStore';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: null,
      embedHeader: false,
      headerDown: false,
    };
    InitializeActions.initApp();
    if (location.search.indexOf('code=') != -1) {
      let code = location.search.substring(6, location.search.indexOf('&'));
      if (code) {
        location.href = location.origin + '/#/login?code=' + code;
      }
    }
  }



  static defaultProps = {streamsAmount: 5};

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    this.scrollListener = this.onScroll.bind(this);
    document.addEventListener('scroll', this.scrollListener);
    BasicDataStore.addChangeListener(this.changeListener);
  }

  componentWillReceiveProps(){
    this.setState({
      headerDown:false
    })
  }

  adjustHeader(headerDown){
    this.setState({
      headerDown:headerDown
    })
  }

  componentWillUnmount() {
    BasicDataStore.removeChangeListener(this.changeListener);
    document.removeEventListener('scroll', this.scrollListener);
  }

  onChange() {
    this.setState({
      streams: _.take(BasicDataStore.getAllStreams(), this.props.streamsAmount)
    });
  }

  onScroll() {
    var scroll_top = document.body.scrollTop;
    try {
      var mainBoxPosition = document.getElementById('main-box').getBoundingClientRect().top;
      this.setState({
        embedHeader: scroll_top >= mainBoxPosition
      });
    }
    catch(error) {
      document.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  componentDidMount() {
    this.updateMainBoxSize();
  }

  componentDidUpdate() {
    this.updateMainBoxSize();
  }

  updateMainBoxSize() {
    if (window.jQuery) {
      var sidebarHeight = $("#sidebar").height(),
        mainBoxHeight = $("#main-box").height();
      if (sidebarHeight > mainBoxHeight)
        $("#main-box").css("height", sidebarHeight + "px");
    }
  }

  render() {
    var headerDown = this.props.routes[1] && this.props.routes[1].headerDown;
    return (
      <div>
        <TopBar embedHeader={this.state.embedHeader}/>
        <section id="content">
          <Header/>
          <div id="main-box" style={{marginTop: headerDown ? 100 : 50}}>
            {this.props.children}
            <SideBar streamsAmount={this.props.streamsAmount} streams={this.state.streams} game={this.props.params.game}/>
          </div>
        </section>
        <div className="clear-float"></div>
        <div className="wrapper">
          <Footer/>
        </div>
      </div>
    );
  }

}

export default App;
