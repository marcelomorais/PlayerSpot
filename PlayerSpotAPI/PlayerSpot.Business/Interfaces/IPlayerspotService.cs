using Newtonsoft.Json.Linq;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Models;
using PlayerSpot.Data.Interfaces;
using PlayerSpot.Data.Models;
using PlayerSpot.LoL.ApiServices.Models;

namespace PlayerSpot.Business.Interfaces
{
    public interface IPlayerSpotService
    {
        PlayerSpotUser GetUser(string userId = "", string streamId = "");
        Summoner GetStreamerSummoner(string name, bool getElo = true);
        UserData GetUserAndDataByChannel(string streamName, string gameName);
        CurrentMatch GetCurrentMatch(long id);
        PlayerSpotUser GetUser(string userId, string streamId, string streamName);
        UserGameAnalysis GetUserGameAnalysisByChannel(string streamName, string gameName, uint count = 30,
            bool filterByChampion = true);
    }
}