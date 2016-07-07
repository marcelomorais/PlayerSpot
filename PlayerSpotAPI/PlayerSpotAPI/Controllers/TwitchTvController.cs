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
using RestSharp;
using PlayerSpotAPI.Helpers;

namespace PlayerSpotAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TwitchTvController : ApiController
    {
        private readonly ITwitchTvService _twitchTvService;

        public TwitchTvController()
        {
            _twitchTvService = new TwitchTvService();
        }

        public JObject GetStreams(string language = "", string game = "", int offset = 0, int limit = 100, long client_id = 0, string stream_type = "")
        {
            var model = _twitchTvService.GetStreams(language, game, offset, limit, client_id, stream_type);

            return JObject.Parse(JsonConvert.SerializeObject(model));
        }

        public JObject GetStreamer(string name = "")
        {
            var model = _twitchTvService.GetStreamer(name);
            return JObject.Parse(JsonConvert.SerializeObject(model));
        }
    }
}