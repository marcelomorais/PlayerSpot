using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class SummonerLeague
    {
        [JsonProperty("queue")]
        public string Queue { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("tier")]
        public string Tier { get; set; }
        [JsonProperty("entries")]
        public List<LeagueEntry> Entries { get; set; }
        public LeagueEntry Entry { get; set; }
    }

    public class LeagueEntry
    {
        [JsonProperty("playerOrTeamId")]
        public long PlayerOrTeamId { get; set; }
        [JsonProperty("playerOrTeamName")]
        public string PlayerOrTeamName { get; set; }
        [JsonProperty("division")]
        public string Division { get; set; }
        [JsonProperty("leaguePoints")]
        public int LeaguePoints { get; set; }
        [JsonProperty("wins")]
        public int Wins { get; set; }
        [JsonProperty("losses")]
        public int Losses { get; set; }
        [JsonProperty("isFreshBlood")]
        public bool IsFreshBlood { get; set; }
        [JsonProperty("isHotStreak")]
        public bool IsHotStreak { get; set; }
        [JsonProperty("isVeteran")]
        public bool IsVeteran { get; set; }
        [JsonProperty("miniSeries")]
        public Series Series { get; set; }
    }

    public class Series {
        [JsonProperty("progress")]
        public string Progress { get; set; }
        [JsonProperty("target")]
        public int Target { get; set; }
        [JsonProperty("losses")]
        public int Losses { get; set; }
        [JsonProperty("wins")]
        public int Wins { get; set; }
    }
}
