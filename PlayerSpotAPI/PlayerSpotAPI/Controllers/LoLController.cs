using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Service;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using PlayerSpot.Twitchtv.ApiServices.Models;
using PlayerSpot.Twitchtv.ApiServices.Utils;
using System.Collections.Generic;
using System.ComponentModel;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using PlayerSpot.LoL.ApiServices.Models;
using RestSharp;
using PlayerSpotAPI.Helpers;

namespace PlayerSpotAPI.Controllers
{
    [EnableCors(origins: "http://playerspot.azurewebsites.net", headers: "*", methods: "*")]
    public class LoLController : ApiController
    {
        private readonly ILoLService _lolService;
        private readonly JsonSerializerSettings serializeSettings;
        private readonly DynamicJsonDeserializer serializer;

        public LoLController()
        {
            serializer = new DynamicJsonDeserializer();
            serializeSettings = new JsonSerializerSettings() { NullValueHandling = NullValueHandling.Ignore };
            _lolService = new LoLService();
        }
        public JObject GetSummoner (string name = "", bool getElo = false)
        {
            var model = _lolService.GetSummoner(name, getElo);
            List<object> responseObject = new List<object> { model };
            if (getElo)
                responseObject.Add(model.League);
            return ResponseHelpers.AddJsonWrapper(new[] { "summoner", "league" }, responseObject);
        }
        public JObject GetSummoner(long id, bool getElo = false)
        {
            var model = _lolService.GetSummoner(id, getElo);
            List<object> responseObject = new List<object> { model };
            if (getElo)
                responseObject.Add(model.League);
            return ResponseHelpers.AddJsonWrapper(new[] { "summoner", "league" }, responseObject);
        }
        public JObject GetSummonerLeague(long id)
        {
            var model = _lolService.GetSummonerLeague(id);
            return ResponseHelpers.AddJsonWrapper(new[] { "league" }, new List<object> { model });
        }
        public JObject GetCurrentMatch(long id)
        {
            var model = _lolService.GetCurrentMatch(id);
            return ResponseHelpers.AddJsonWrapper(new[] { "match" }, new List<object> { model });
        }

        public JObject GetCurrentMatch(string name)
        {
            var model = _lolService.GetCurrentMatch(name);
            return ResponseHelpers.AddJsonWrapper(new[] { "match" }, new List<object> { model });
        }

        public JObject GetLastRankedMatches(long id, uint count = 30, long? champion = null)
        {
            var model = _lolService.GetLastRankedMatches(id, count, champion);
            return JObject.Parse(JsonConvert.SerializeObject(model));
        }

        public JObject GetSummonerFrameEvents(long id, long champion, uint count = 30)
        {
            var matchFrameEvents = _lolService.GetSummonerFrameEvents(id, champion, count);
            var jsonObject = new List<object>();
            foreach (var match in matchFrameEvents)
            {
                foreach (var frames in match.Value)
                {
                    jsonObject.Add(ResponseHelpers.AddJsonWrapper(new[] { "match", "champion", "frames" },
                        new List<object> { match.Key, frames.Key, frames.Value }));
                }

            }
            return ResponseHelpers.AddJsonWrapper(new[] { "matchFrameEvents" }, new List<object> { jsonObject });
        }
    }
}