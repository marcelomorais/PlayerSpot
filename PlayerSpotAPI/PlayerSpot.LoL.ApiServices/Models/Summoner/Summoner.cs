using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class Summoner
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("profileIconId")]
        public string ProfileIconId  { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("summonerLevel")]
        public string SummonerLevel { get; set; }
        public SummonerLeague League { get; set; }
    }
}
