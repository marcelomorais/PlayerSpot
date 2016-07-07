using Newtonsoft.Json;
using PlayerSpot.Twitchtv.ApiServices.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Twitchtv.ApiServices.Contracts
{
    public class TwitchTvResponse
    {
        [JsonProperty("alias")]
        public string Alias { get; set; }

    }
}




