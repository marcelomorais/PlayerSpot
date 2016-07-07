using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models.Match
{
    public class BannedChampion
    {
        [JsonProperty("pickTurn")]
        public string PickTurn { get; set; }
        [JsonProperty("championId")]
        public string ChampionId { get; set; }
        [JsonProperty("teamId")]
        public string TeamId { get; set; }
        public Champion Champion { get; set; }

    }
}
