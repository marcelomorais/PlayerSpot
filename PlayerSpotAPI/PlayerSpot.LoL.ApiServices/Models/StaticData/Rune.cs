using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class Rune : IStaticData
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("key")]
        public string Key { get; set; }
        [JsonProperty("rune")]
        public RuneInfo RuneInfo{ get; set; }
        [JsonProperty("image")]
        public StaticImage StaticImage { get; set; }
        public string Image { get; set; }
        [JsonProperty("count")]
        public int Count { get; set; }
    }

    public class RuneInfo
    {
        [JsonProperty("isRune")]
        public bool IsRune { get; set; }
        [JsonProperty("tier")]
        public string Tier { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
    }

    public class RunePage
    {
        public string MatchId { get; set; }
        public List<Rune> RedRunes { get; set; }
        public List<Rune> YellowRunes { get; set; }
        public List<Rune> BlueRunes { get; set; } 
        public List<Rune> BlackRunes { get; set; }

        public static bool UseSamesRunes(RunePage a , RunePage b)
        {
            return IsSameList(a.RedRunes, b.RedRunes) && IsSameList(a.BlackRunes, b.BlackRunes) &&
                   IsSameList(a.BlueRunes, b.BlueRunes) && IsSameList(a.YellowRunes, b.YellowRunes);
        }

        private static bool IsSameList(List<Rune> a, List<Rune> b)
        {
            var ret = a.Count == b.Count;
            if (ret == false)
                return false;
            for (int i = 0; i < a.Count; i++)
            {
                var runeA = a[i];
                var runeB = b[i];
                if (runeA.Id != runeB.Id || runeA.Count != runeB.Count)
                    return false;
            }
            return true;}
    }
}
