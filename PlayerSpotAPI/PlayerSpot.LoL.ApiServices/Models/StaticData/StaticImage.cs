using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class StaticImage
    {
        [JsonProperty("group")]
        public string Group { get; set; }
        [JsonProperty("full")]
        public string Image { get; set; }
    }
}
