using PlayerSpot.Business.DataBinders;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.LoL.ApiServices.Client;
using PlayerSpot.LoL.ApiServices.Client.Interface;
using PlayerSpot.LoL.ApiServices.Contracts;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpotAPI;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading;
using PlayerSpot.DataAnalysis;
using PlayerSpot.LoL.ApiServices.Models.Match;

namespace PlayerSpot.Business.Service
{
    public class LoLService : ILoLService
    {
        LoLServiceBinder Binder;
        public LoLService()
        {
            Binder = new LoLServiceBinder(this);
        }

     
        public Summoner GetSummoner(string name, bool getElo)
        {
            var version = ConfigurationManager.AppSettings["summonerApiVersion"];
            var apiClient = new LoLApiClient(version);
            var request = new GetBySummonerName() { SummonerNames = name };
            return apiClient.GetSummoner(name);
        }
        public Summoner GetSummoner(long id, bool getElo)
        {
            var version = ConfigurationManager.AppSettings["summonerApiVersion"];
            var apiClient = new LoLApiClient(version);
            var request = new GetBySummonerId() { Id = id };
            if (getElo)
            {
                var summoner = apiClient.GetSummoner(id);
                summoner.League = GetSummonerLeague(id);
                return summoner;

            }
            return apiClient.GetSummoner(id);
        }
        public SummonerLeague GetSummonerLeague(long id)
        {
            var version = ConfigurationManager.AppSettings["leagueApiVersion"];
            var apiClient = new LoLApiClient(version, false);
            var request = new GetBySummonerId() { Id = id };
            var summonerLeague = apiClient.GetSummonerLeague(id);
            if (summonerLeague != null)
            {
                summonerLeague.Entry = summonerLeague.Entries.Find(x => x.PlayerOrTeamId == id);
                summonerLeague.Entries = null;
            }
            return summonerLeague;
        }
        public CurrentMatch GetCurrentMatch(long id)
        {
            var apiClient = new LoLApiClient(null, false, true);
            var request = new GetBySummonerId() { Id = id };
            return LoLServiceBinder.CurrentMatchData(apiClient.GetCurrentMatch(id));
        }

        public CurrentMatch GetCurrentMatch(string name)
        {
            var summonerId = GetSummoner(name, false).Id;
            return GetCurrentMatch(summonerId);
        }

        public MatchHistory GetLastRankedMatches(long id, uint count = 30, long? champion = null)
        {
            var version = ConfigurationManager.AppSettings["matchApiVersion"];
            var apiClient = new LoLApiClient(version);
            return apiClient.GetLastRankedMatches(id, count, champion);
        }

        public RawMatch GetRawMatch(long id, bool includeTimeline)
        {
            var version = ConfigurationManager.AppSettings["matchApiVersion"];
            var apiClient = new LoLApiClient(version);
            return apiClient.GetRawMatch(id, includeTimeline);
        }

        public List<RawMatch> GetRawMatches(long id, bool includeTimeline, uint count = 30, long? champion = null)
        {
            var version = ConfigurationManager.AppSettings["matchApiVersion"];
            var apiClient = new LoLApiClient(version);
            return apiClient.GetRawMatches(id, includeTimeline,count,champion);
        }

        public List<RawMatch> GetRawMatches(MatchHistory history, bool includeTimeline)
        {
            var version = ConfigurationManager.AppSettings["matchApiVersion"];
            var apiClient = new LoLApiClient(version);
            return apiClient.GetRawMatches(history, includeTimeline).Where(x=> !string.IsNullOrEmpty(x.MatchId)).ToList();
        }

        public Dictionary<RawMatch, Dictionary<Champion, List<FrameEvent>>> GetSummonerFrameEvents(long id, long champion, uint count = 30)
        {
            var rawMatches = GetLastRankedMatches(id, count, champion).Matches.Select(x => GetRawMatch(x.MatchId, true)).ToList();
            var summonerChampionList = LoLDataAnalysis.GetSummonerParticipants(id, rawMatches).Values.Select(x => x.ChampionId).ToList();
            return LoLDataAnalysis.GetMatchesChampionsFrameEvents(rawMatches, summonerChampionList);
        }
    }
}
