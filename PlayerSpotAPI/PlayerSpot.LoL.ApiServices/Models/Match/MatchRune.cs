using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models.Match
{
    public class MatchRune
    {
        [JsonProperty("rank")]
        public int Rank { get; set; }
        [JsonProperty("count")]
        public int Count { get; set; }
        [JsonProperty("runeId")]
        public string Id { get; set; }
        public Rune Rune { get; set; }
    }
}
