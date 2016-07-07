using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpot.LoL.ApiServices.Models.Match;
using System.Collections.Generic;

namespace PlayerSpot.Business.Interfaces
{
    public interface ILoLService
    {
        Summoner GetSummoner(string name, bool getElo);
        Summoner GetSummoner(long id, bool getElo);
        SummonerLeague GetSummonerLeague(long id);
        CurrentMatch GetCurrentMatch(long id);
        CurrentMatch GetCurrentMatch(string name);
        MatchHistory GetLastRankedMatches(long id, uint count = 30, long? champion = null);
        RawMatch GetRawMatch(long id,bool includeTimeline);
        List<RawMatch> GetRawMatches(long id, bool includeTimeline, uint count = 30, long? champion = null);
        List<RawMatch> GetRawMatches(MatchHistory history, bool includeTimeline);
        Dictionary<RawMatch, Dictionary<Champion, List<FrameEvent>>> GetSummonerFrameEvents(long id, long champion, uint count = 30);
    }
}
