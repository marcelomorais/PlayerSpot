using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models.Match
{
    public class MatchMastery
    {
        [JsonProperty("rank")]
        public string Rank { get; set; }
        [JsonProperty("masteryId")]
        public string Id { get; set; }
        public Mastery Mastery { get; set; }
    }

}
