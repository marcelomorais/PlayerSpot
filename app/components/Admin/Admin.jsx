import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import Header from '../Header/Header';
import ImageSlider from '../ImageSlider/ImageSlider';
import Footer from '../Footer/Footer';
import AdminLeft from './AdminLeft';
import AdminTabs from './AdminTabs';
import Authenticate from '../../mixins/AuthenticatedMixin';
import AccountStore from '../../stores/accountStore';
import AccountActions from '../../actions/accountActions';
import GameStore from '../../stores/gameStore';
import GameActions from '../../actions/gameActions';
import EditArticle from './Articles/EditArticle';
import ListArticle from './Articles/ListArticle';
import ListUser from './Users/ListUser';
import ListGame from './Games/ListGame';
import EditGame from './Games/EditGame';
import ListCompetitiveGame from './Games/ListCompetitiveGame';
import EditCompetitiveGame from './Games/EditCompetitiveGame';
import ListStreamer from './Streamers/ListStreamer';
import EditStreamer from './Streamers/EditStreamer';
import _ from 'lodash';

class Admin extends Component {

  static propTypes = { a:1 };

  constructor(props) {
    super(props);
    Authenticate();
    GameActions.getGames();
    this.state = {
      tab: 0,
      user: AccountStore.getUser(),
    };
  }

  getTabs() {
    return [
      {
        id: 0,
        name: 'Página Inicial',
        buttons: [
          {
            text: '',
            component: null,
          },
        ],
      },
      {
        id: 1,
        name: 'Notícias',
        component: <ListArticle tabId={1} listMax={10}
                    setRightComponent={this.setRightComponent.bind(this)}
                    selectTab={this.selectTab.bind(this)}
                    editArticleComp={EditArticle} games={this.state.games}/>,
        buttons: [
          {
            text: 'Adicionar notícia',
            component: <EditArticle tabId={1} action="create" games={this.state.games}
                        selectTab={this.selectTab.bind(this)}/>,
            icon: 'fa-plus',
          },
        ],
      },
      {
        id: 2,
        name: 'Usuários',
        component: <ListUser tabId={2} listMax={10}
                    setRightComponent={this.setRightComponent.bind(this)}
                    selectTab={this.selectTab.bind(this)}/>,
        buttons: [
          {
            text: '',
            callback: ()=> {
            },
          },
        ],
      },
      {
        id: 3,
        name: 'Jogos',
        component: <ListGame tabId={3} listMax={10}
                    setRightComponent={this.setRightComponent.bind(this)}
                    selectTab={this.selectTab.bind(this)}
                    editGameComp={EditGame} games={this.state.games}/>,
        buttons: [
          {
            text: 'Lista de Jogos',
            component: <ListGame tabId={3} listMax={10}
                        setRightComponent={this.setRightComponent.bind(this)}
                        selectTab={this.selectTab.bind(this)}
                        editGameComp={EditGame} games={this.state.games}/>,
            icon: 'fa-search',
          },
          {
            text: 'Lista de Jogos Competitivos',
            component: <ListCompetitiveGame tabId={3} listMax={10}
                        setRightComponent={this.setRightComponent.bind(this)}
                        selectTab={this.selectTab.bind(this)}
                        editGameComp={EditCompetitiveGame} games={this.state.games}/>,
            icon: 'fa-search',
          },
        ],
      },
      {
        id: 4,
        name: 'Streamers',
        component: <ListStreamer tabId={4} listMax={10}
                    setRightComponent={this.setRightComponent.bind(this)}
                    selectTab={this.selectTab.bind(this)}
                    editStreamerComp={EditStreamer} games={this.state.games}/>,
        buttons: [
          {
            text: 'Adicionar streamer',
            component: <EditStreamer tabId={3} action="create" selectTab={this.selectTab.bind(this)}
                                     games={this.state.games}/>,
            icon: 'fa-plus',
          },
        ],
      },
      {
        id: 5,
        name: 'Eventos',
        buttons: [
          {
            text: '',
            callback: ()=> {
            },
          },
        ],
      },
      {
        id: 6,
        name: 'Estatísticas',
        buttons: [
          {
            text: '',
            callback: ()=> {
            },
          },
        ],
      },
    ];
  }

  setRightComponent(component, event) {
    if (event)
      event.preventDefault();
    this.setState({
      rightComponent: component,
    });
  }

  componentWillMount() {
    this.changeListener = this.onChange.bind(this);
    this.gameListener = this.onGameChange.bind(this);
    AccountStore.addChangeListener(this.changeListener);
    GameStore.addChangeListener(this.gameListener);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.changeListener);
    GameStore.removeChangeListener(this.gameListener);
  }

  onGameChange() {
    this.setState({
      games: GameStore.getGames(),
    });
  }

  onChange() {
    this.setState({
      user: AccountStore.getUser(),
    });
    Authenticate();
  }

  selectTab(tab, event) {
    if (event)
      event.preventDefault();
    this.setState({
      tab: tab,
      rightComponent: _.find(this.getTabs.call(this), x=> x.id == tab).component,
    });
  }

  render() {
    return (
      <div>
        <TopBar/>
        <section id="content">
          <Header/>
          <div id="main-box" style={{ marginTop: 160 }}>
            <div id="main" className="main-admin">
              <AdminLeft tabs={this.getTabs()} tab={this.state.tab}
                         setRightComponent={this.setRightComponent.bind(this)}/>
              <div className="game-info-right admin-right">
                <AdminTabs tabs={this.getTabs()} tab={this.state.tab}
                  selectTab={this.selectTab.bind(this)}/>
                {this.state.rightComponent}
              </div>
              <div className="clear-float"></div>
            </div>
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

export default Admin;
