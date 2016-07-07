using PlayerSpot.LoL.ApiServices.Contracts;
using PlayerSpot.LoL.ApiServices.Models;
using System.Collections.Generic;

namespace PlayerSpot.LoL.ApiServices.Client.Interface
{
    public interface ILoLApiClient
    {
        Dictionary<string, T> GetStaticData<T>(string content, string jsonPath);
        Dictionary<string, T> GetStaticData<T>(StaticDataRequest request, string jsonPath);
        List<string> GetVersions();
        Summoner GetSummoner(string name);
        Summoner GetSummoner(long id);
        MatchHistory GetLastRankedMatches(long id, uint count = 30, long? champion = null);
    }
}
