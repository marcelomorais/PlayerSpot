﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Twitchtv.ApiServices.Models
{
    public class ScaledImage
    {
        [JsonProperty("large")]
        public string Large { get; set; }
        [JsonProperty("medium")]
        public string Medium { get; set; }
        [JsonProperty("small")]
        public string Small { get; set; }
        [JsonProperty("template")]
        public string Template { get; set; }
    }
}
