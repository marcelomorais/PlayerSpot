using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class Mastery : IStaticData
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("description")]
        public string[] Description { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("image")]
        public StaticImage StaticImage { get; set; }
        public string Image { get; set; }
    }
}
