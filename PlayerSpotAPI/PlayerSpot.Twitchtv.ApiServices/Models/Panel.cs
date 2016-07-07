using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace PlayerSpot.Twitchtv.ApiServices.Models
{
    public class Panel
    {
        [JsonProperty("_id")]
        public int Id { get; set; }
        [JsonProperty("display_order")]
        public int DisplayOrder { get; set; }
        [JsonProperty("kind")]
        public string Kind { get; set; }
        [JsonProperty("html_description")]
        public string HtmlDescription { get; set; }
        [JsonProperty("user_id")]
        public int UserId { get; set; }
        [JsonProperty("data")]
        public PanelData Data { get; set; }
        [JsonProperty("channel")]
        public string Channel { get; set; }

        public class PanelData
        {
            [JsonProperty("link")]
            public string Link { get; set; }
            [JsonProperty("image")]
            public string Image { get; set; }
            [JsonProperty("title")]
            public string Title { get; set; }
            [JsonProperty("description")]
            public string Description { get; set; }
        }

    }
}
