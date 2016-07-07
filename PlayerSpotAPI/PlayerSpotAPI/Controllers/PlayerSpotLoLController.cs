using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Service;
using PlayerSpot.Data.Entities;
using PlayerSpot.Data.Interfaces;
using PlayerSpot.Data.Models;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpotAPI.Helpers;

namespace PlayerSpotAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PlayerSpotLoLController : ApiController
    {
        IPlayerSpotService _playerSpotService;

        public PlayerSpotLoLController()
        {
            _playerSpotService = new PlayerSpotService();
        }

        public JObject GetUserByChannel(string streamName)
        {
            var user = _playerSpotService.GetUser(null, null, streamName);
            return JObject.Parse(JsonConvert.SerializeObject(user));
        }

        public JObject GetUserAndDataByChannel(string streamName, string gameName = "League Of Legends")
        {
            return JObject.Parse(JsonConvert.SerializeObject(_playerSpotService.GetUserAndDataByChannel(streamName, gameName)));
        }

        public JObject GetUserGameAnalysisByChannel(string streamName, string gameName = "League of Legends",
            uint count = 10, bool filterByChampion = true)
        {
            var UserGameAnalysis = _playerSpotService.GetUserGameAnalysisByChannel(streamName, gameName, count,
                filterByChampion);
            var items = ResponseHelpers.CustomDictonaryParse(UserGameAnalysis.Items, "item", "percent");
            var spells = ResponseHelpers.CustomDictonaryParse(UserGameAnalysis.Spells, "summonerSpell", "percent");
            var runes = ResponseHelpers.CustomDictonaryParse(UserGameAnalysis.Runes, "rune", "percent");
            var skills = ResponseHelpers.CustomDictonaryParse(UserGameAnalysis.Skills, "skill", "percent");
            return ResponseHelpers.AddJsonWrapper(new[] { "kda","items","spells","runes","skills" }, new List<object>() {UserGameAnalysis.KDA,items,spells,runes,skills });
        }
    }
}
