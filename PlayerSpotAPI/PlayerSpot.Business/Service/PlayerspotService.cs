using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Models;
using PlayerSpot.Data.Entities;
using PlayerSpot.Data.Interfaces;
using PlayerSpot.Data.Models;
using PlayerSpot.DataAnalysis;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpotAPI;

namespace PlayerSpot.Business.Service
{
    public class PlayerSpotService : IPlayerSpotService
    {
        private ITwitchTvService _twitchTvService;
        private ILoLService _lolService;
        private IDataService _dataService;

        public PlayerSpotService()
        {
            _twitchTvService = new TwitchTvService();
            _dataService = new MockDataUser();
            _lolService = new LoLService();
        }

        public PlayerSpotUser GetUser(string userId = "", string streamId = "")
        {
            return _dataService.GetUser(userId, streamId);
        }

        public Summoner GetStreamerSummoner(string name, bool getElo = true)
        {
            return _lolService.GetSummoner(name, getElo);
        }

        public UserData GetUserAndDataByChannel(string streamName, string gameName)
        {
            var user = _dataService.GetUser(null, null, streamName);
            GameInfo.GameName game = string.IsNullOrEmpty(gameName) ? GameInfo.GameName.LeagueOfLegends : GameInfo.TryGetName(gameName);
            var summonerIds = user.GamesInfos.Where(x => x.Name == game).Select(x => x.PlayerInfo).ToList();
            CurrentMatch match = null;
            Summoner summoner = null;
            foreach (var summonerId in summonerIds)
            {
                var id = long.Parse(summonerId);
                var m = _lolService.GetCurrentMatch(id);
                if (m == null) continue;
                match = m;
                summoner = _lolService.GetSummoner(id, true);
                break;
            }
            return new UserData { User = user, CurrentMatch = match, Summoner = summoner }; ;
        }

        public UserGameAnalysis GetUserGameAnalysisByChannel(string streamName, string gameName, uint count = 30, bool filterByChampion = true)
        {
            var userData = GetUserAndDataByChannel(streamName, gameName);
            var summonerId = userData.Summoner.Id;
            var participant = userData.CurrentMatch.Participants.First(x => x.SummonerId == summonerId);
            MatchHistory history = filterByChampion ? _lolService.GetLastRankedMatches(summonerId, count, long.Parse(participant.ChampionId)) : _lolService.GetLastRankedMatches(summonerId, count);
            var rawMatches = _lolService.GetRawMatches(history, true);
            var kda = LoLDataAnalysis.GetAverageKDA(summonerId, rawMatches);
            var items = LoLDataAnalysis.GetItemsAverage(summonerId, rawMatches);
            var runes = LoLDataAnalysis.GetRunePageAverage(summonerId, rawMatches);
            var spells = LoLDataAnalysis.GetSummonerSpellsAverage(summonerId, rawMatches);
            var skillOrder = LoLDataAnalysis.GetSummonerSkillOrderAverage(summonerId, rawMatches);
            return new UserGameAnalysis() { KDA = kda, Items = items, Runes = runes, Spells = spells, Skills = skillOrder };
        }
        public CurrentMatch GetCurrentMatch(long id)
        {
            return _lolService.GetCurrentMatch(id);
        }

        public PlayerSpotUser GetUser(string userId, string streamId, string streamName)
        {
            return _dataService.GetUser(userId, streamId, streamName);
        }
    }
}
