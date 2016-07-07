using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PlayerSpot.Twitchtv.ApiServices.Models;

namespace PlayerSpot.Data.Models
{
    public class PlayerSpotUser
    {
        public string Id { get; set; }
        [JsonProperty("twitch")]
        public TwitchTvUser TwitchUser { get; set; }
        [JsonProperty("games")]
        public List<GameInfo> GamesInfos { get; set; }

       
    }
}
