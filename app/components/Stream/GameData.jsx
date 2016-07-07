import React, { Component } from 'react';
import StreamActions from '../../actions/streamActions';
import StreamStore from '../../stores/streamStore';
import ListWrapper from '../../mixins/ListWrapper';
import ActionTypes from '../../constants/ActionTypes';

var TEAMS_ID = [
  { id: 100, color:'#fff3f3' },
  { id: 200, color:'#f5fafe' }
];

function romanToNumber(roman){
  if(roman == 'I')
    return 1;
  if(roman == 'II')
    return 2;
  if(roman == 'III')
    return 3;
  if(roman == 'IV')
    return 4;
  if(roman == 'V')
    return 5;
}

class GameData extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      inGameData: null,
      currentData: 'Runes'

    }
    StreamActions.getInGameData(this.props.channel, this.props.game);
  }

  componentWillMount() {
    this.dataListener = this.onLoad.bind(this);
    StreamStore.addChangeListener(this.dataListener, ActionTypes.STREAMER_INGAME);
  }

  componentWillUnmount() {
    StreamStore.removeChangeListener(this.dataListener, ActionTypes.STREAMER_INGAME);
  }

  onLoad() {
    let inGameData = StreamStore.getInGameData();
    setTimeout(x=> this.showParticipantData(inGameData.currentMatch.participants[0]), 500);
    this.setState({
      inGameData,
    });
  }

  getBannedChampions(team) {
    var bannedChampions = this.state.inGameData.currentMatch.bannedChampions;
    var teamBans = [];
    bannedChampions.filter(x=> x.teamId == team).map(champion => {
     let content = (
       <div title={champion.Champion.name}>
         <img src={champion.Champion.Image}/>
       </div>);
       teamBans.push(
       <ListWrapper className='game-participant' content={content} key={champion.Champion.id}>
       </ListWrapper>);
   });
  return (
      <ol className={'bans-team color-team' + team}>
        {teamBans}
      </ol>);
  }

  getCurrentPlayers() {
    var participants = this.state.inGameData.currentMatch.participants;
    var summonerId = this.state.inGameData.summoner.id;
    var participantHTML = [];
    TEAMS_ID.forEach(team => {
      participants.filter(x=> x.teamId == team.id).map(participant => {
       let content = [];
       let border = participant.Summoner.League ? 'url(http://sk2.op.gg/images/borders/'+ participant.Summoner.League.tier.toLowerCase() +'.png)' : '';
       content.push(
         <div className={'summoner' + participant.Summoner.id} title={participant.Champion.name}
           style={{backgroundImage: border}} onClick={this.showParticipantData.bind(this, participant)}>
           {participant.summonerId == summonerId ? <img className={'current-participant-stream-' + participant.teamId} src='images/social-icon-twitch.png'/> : null}
           <img title={participant.summonerName} src={participant.Champion.Image}/>
         </div>)
         participantHTML.push(
         <ListWrapper className='game-participant' content={content} key={participant.Champion.id}>
         </ListWrapper>);
     });
   });

  return (
    <div className='participants-list gameData-container'>
      <h2 style={{textAlign: 'center', marginRight: '15%', fontSize: 25, marginBottom: 10}}>Jogadores</h2>
      <h2 className='h2-bans'>Bans</h2>
      <ol className='participants-team color-team100'>
        {participantHTML[0]}{participantHTML[1]}{participantHTML[2]}{participantHTML[3]}{participantHTML[4]}
      </ol>
      {this.getBannedChampions(100)}
      {this.getBannedChampions(200)}
      <ol className='participants-team color-team200'>
        {participantHTML[5]}{participantHTML[6]}{participantHTML[7]}{participantHTML[8]}{participantHTML[9]}
      </ol>
    </div>);
  }

  showParticipantData(participant, ev){
    if(ev)
      ev.preventDefault();
    var prevs = [].slice.call(document.getElementsByClassName('game-participant-selected'));
    for(let i=0; i < prevs.length; i++){
      var prev = prevs[i];
      prev.className = prev.className.replace(' game-participant-selected', '');
    }
    var summonerImages = document.getElementsByClassName('summoner' + participant.Summoner.id);
    for(let i=0; i < summonerImages.length; i++){
      var summoner = summonerImages[i];
      summoner.className += ' game-participant-selected';
    }
    this.setState({
      currentParticipant: participant
    });
  }

  setCurrentData(data, ev){
    if(ev)
      ev.preventDefault();
    this.setState({
      currentData: data
    })
  }

  getCurrentParticipantData(){
      var participant = this.state.currentParticipant;
      if(!participant)
        return null;
      var color = TEAMS_ID.find(x=> participant.teamId == x.id).color;
      var tierImage = 'http://sk2.op.gg/images/medals/';
      var participantLeague = participant.Summoner.League;
      var runes = participant.runes.map(rune => {
        var content = (
          <div>
              <img src={rune.Rune.Image} title={rune.Rune.name} style={{width: '15%'}}/>
              <div className='current-participant-rune-desc'>
                <span>x {rune.count}</span>
                <span>{rune.Rune.description}</span>
              </div>
          </div>
        );
        return(
          <ListWrapper content={content} key={rune.runeId}/>
        );
      })
      return(
        <div className='gameData-container-2' key={participant.Summoner.id}>
          <h2 style={{textAlign: 'center', fontSize: 25, marginBottom: 10}}>Summoner selecionado:
            <span style={{fontWeight: 400, fontSize: 24, color: 'rgba(4, 4, 4, 0.84)'}}> {participant.summonerName}</span>
          </h2>
          <div className='current-participant' style={{backgroundColor: color}}>
            <div className='current-participant-leftcontainer'>
              <div className='current-participant-basicdata'>
                <h2 style={{textAlign: 'center', marginBottom: '5%'}}>Dados Gerais</h2>
                <div className='current-participant-leftdata'>
                  <img src={participant.ProfileIcon.Image} style={{border: '3px solid #B3B3B3', width:'75%', marginBottom: '5%'}} />
                  <div style={{'fontWeight': 600}}>
                    <span>{participant.Summoner.name}</span>
                  </div>
                  <div>
                    <span className='current-participant-keyspan'>Vitórias: </span>
                    <span className='current-participant-valuespan' style={{color: participantLeague.Entry.wins > participantLeague.Entry.losses ? 'green' : 'red'}}>
                      {participantLeague.Entry.wins}
                    </span>
                  </div>
                  <div>
                    <span className='current-participant-keyspan'>Derrotas: </span>
                    <span className='current-participant-valuespan' style={{color: participantLeague.Entry.wins > participantLeague.Entry.losses ? 'red' : 'green'}}>
                      {participantLeague.Entry.losses}</span>
                  </div>
                </div>
                <div className='current-participant-rightdata'>
                  <img className='current-participant-divison' src={tierImage + participantLeague.tier.toLowerCase() + '_'+ romanToNumber(participantLeague.Entry.division) + '.png'}/>
                  <div style={{marginTop: '-19%', marginLeft: '10%'}}>
                    <div>
                      <span className='current-participant-keyspan'>Divisão: </span>
                      <span className='current-participant-valuespan'>{participantLeague.tier} {participantLeague.Entry.division}</span>
                    </div>
                    <div>
                      <span className='current-participant-keyspan'>Pontos: </span>
                      <span className='current-participant-valuespan'>{participantLeague.Entry.leaguePoints}</span>
                      {participantLeague.Entry.isVeteran ? <i className="fa fa-trophy" aria-hidden="true" title="Veterano" style={{ marginLeft: '3%', color:'#D0A562' }}></i> : null}
                      {participantLeague.Entry.isHotStreak ? <i className="fa fa-fire" aria-hidden="true" title="Invicto"  style={{ marginLeft: '1%', color:'rgba(255, 0, 0, 0.64)' }}></i> : null}
                    </div>
                    { participantLeague.Entry.miniSeries ?
                      (<div>
                        <span className='current-participant-keyspan'>Series: </span>
                        <span>{this.getSeries(participantLeague.Entry.miniSeries)}</span>
                      </div>) :
                       null }
                   </div>
                </div>
              </div>
              <div className='current-participant-basicdata'>
                <h2 style={{textAlign: 'center'}}>Dados da Partida</h2>
                <div className='current-participant-leftdata'>
                  <img src={participant.Champion.Image} title={participant.Champion.name}/>
                </div>
                <div className='current-participant-rightdata'>
                  <div>
                    <span className='current-participant-keyspan'>Campeão: </span>
                    <span>{participant.Champion.name}</span>
                  </div>
                  <div className='current-participant-spell'>
                    <span className='current-participant-keyspan'>Magia D: </span>
                    <img src={participant.Spell1.Image} title={participant.Spell1.name}/>
                  </div>
                  <div className='current-participant-spell'>
                    <span className='current-participant-keyspan'>Magia F: </span>
                    <img style={{marginLeft: 2}} src={participant.Spell2.Image} title={participant.Spell2.name}/>
                  </div>
                </div>
              </div>
            </div>
            <div className='current-participant-rightcontainer'>
              <h2 onClick={this.setCurrentData.bind(this, 'Runes')} style={{float: 'left', textDecoration: this.state.currentData == 'Runes' ? 'underline' : ''}}>Runes</h2>
              <h2 onClick={this.setCurrentData.bind(this, 'Masteries')} style={{float: 'right', textDecoration: this.state.currentData == 'Masteries' ? 'underline' : ''}}>Masteries</h2>
              <div style={{visibility: this.state.currentData == 'Runes' ? 'initial' : 'hidden'}}>
                <ol className='current-participant-runes'>
                  {runes}
                </ol>
              </div>
              <div style={{visibility: this.state.currentData == 'Masteries' ? 'initial' : 'hidden'}}>

              </div>
            </div>
          </div>
        </div>
      );
  }

  getSeries(series){
    return series.progress.split('').map(status => {
      if (status == "W") {
        return <i title='Vitória' className="fa fa-check-circle" aria-hidden="true" style={{color: 'rgb(115, 163, 187)', marginRight: '1%'}}></i>
      } else if (status == "L") {
        return <i title='Derrota' className="fa fa-times-circle" aria-hidden="true" style={{color: '#FB5D5F', marginRight: '1%'}}></i>
      } else {
        return <i title='Não jogado' className="fa fa-circle" aria-hidden="true" style={{color: 'rgba(35, 35, 35, 0.46)', marginRight: '1%'}}></i>
      }
    })
  }

  render() {
    if(!this.state.inGameData)
      return null;
    var style = this.props.style || { marginTop: '2%' };
    style.display =  this.props.visible? 'flex' : 'none';
    return (
    <div className={this.props.theaterMode ? 'game-data-theater' : ''}>
      <div style={style}>
        {this.getCurrentPlayers()}
        {this.getCurrentParticipantData()}
      </div>
      <div style={style}>
        {this.getBannedChampions()}
      </div>
      <div style={style}>
        {this.getBannedChampions()}
      </div>
    </div>);
  }

}

export default GameData;
