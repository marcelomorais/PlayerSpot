using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PlayerSpot.LoL.ApiServices.Models;

namespace PlayerSpot.Data.Models
{
    public class UserData
    {
        [JsonProperty("user")]
        public PlayerSpotUser User { get; set; }
        [JsonProperty("currentMatch")]
        public CurrentMatch CurrentMatch { get; set; }
        [JsonProperty("summoner")]
        public Summoner Summoner { get; set; }
    }
}
