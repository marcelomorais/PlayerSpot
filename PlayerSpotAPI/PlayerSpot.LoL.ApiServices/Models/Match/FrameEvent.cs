using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace PlayerSpot.LoL.ApiServices.Models.Match
{
    public class FrameEvent
    {
        [JsonProperty("events")]
        public List<RawMatch.Event> Events { get; set; }
        [JsonProperty("summonerFrame")]
        public RawMatch.FramesInfos SummonerFrame { get; set; }
        [JsonProperty("timestamp")]
        public long Timestamp { get; set; }
        public string MatchId { get; set; }
    }
}
