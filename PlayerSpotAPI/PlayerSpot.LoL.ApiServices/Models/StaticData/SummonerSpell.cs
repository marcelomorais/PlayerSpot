using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class SummonerSpell : IStaticData
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("key")]
        public string Key { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("summonerLevel")]
        public string SummonerLevel { get; set; }
        [JsonProperty("image")]
        public StaticImage StaticImage { get; set; }
        public string Image { get; set; }
    }
}
