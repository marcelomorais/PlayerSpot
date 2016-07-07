using Newtonsoft.Json;
using PlayerSpot.LoL.ApiServices.Models.Match;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class CurrentMatch
    {
        [JsonProperty("gameMode")]
        public string GameMode { get; set; }
        [JsonProperty("gameType")]
        public string GameType { get; set; }
        [JsonProperty("gameId")]
        public string GameId { get; set; }
        [JsonProperty("gameStartTime")]
        public string StartTime { get; set; }
        [JsonProperty("participants")]
        public List<MatchParticipant> Participants { get; set; }
        //[JsonProperty("gameId")]
        //public string GameId { get; set; }
        [JsonProperty("bannedChampions")]
        public List<BannedChampion> BannedChampions { get; set; }

    }

    public class MatchParticipant
    {
        [JsonProperty("masteries")]
        public List<MatchMastery> Masteries { get; set; }
        [JsonProperty("runes")]
        public List<MatchRune> Runes { get; set; }
        [JsonProperty("spell1Id")]
        public string Spell1Id { get; set; }
        public SummonerSpell Spell1 { get; set; }
        [JsonProperty("spell2Id")]
        public string Spell2Id { get; set; }
        public SummonerSpell Spell2 { get; set; }
        [JsonProperty("profileIconId")]
        public string ProfileIconId { get; set; }
        public ProfileIcon ProfileIcon { get; set; }
        [JsonProperty("summonerName")]
        public string SummonerName { get; set; }
        [JsonProperty("championId")]
        public string ChampionId { get; set; }
        public Champion Champion { get; set; }
        [JsonProperty("teamId")]
        public string TeamId { get; set; }
        [JsonProperty("summonerId")]
        public long SummonerId { get; set; }
        public Summoner Summoner { get; set; }
    }
}
