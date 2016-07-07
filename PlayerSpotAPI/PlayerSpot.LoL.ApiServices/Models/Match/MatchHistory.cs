using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class MatchHistory
    {
        [JsonProperty("matches")]
        public List<Match> Matches { get; set; }
        [JsonProperty("totalGames")]
        public int TotalGames { get; set; }
        [JsonProperty("startIndex")]
        public int StartIndex { get; set; }
        [JsonProperty("endIndex")]
        public int EndIndex { get; set; }

        public class Match
        {
            [JsonProperty("timestamp")]
            public long Timestamp { get; set; }
            [JsonProperty("champion")]
            public int Champion { get; set; }
            [JsonProperty("region")]
            public string Region { get; set; }
            [JsonProperty("queue")]
            public string Queue { get; set; }
            [JsonProperty("season")]
            public string Season { get; set; }
            [JsonProperty("matchId")]
            public int MatchId { get; set; }
            [JsonProperty("role")]
            public string Role { get; set; }
            [JsonProperty("platformId")]
            public string PlatformId { get; set; }
            [JsonProperty("lane")]
            public string Lane { get; set; }
        }
    }
}
