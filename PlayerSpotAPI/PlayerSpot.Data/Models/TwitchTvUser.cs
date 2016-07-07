using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace PlayerSpot.Data.Models
{
    public class TwitchTvUser
    {
        [JsonProperty("access_token")]
        public string AcessToken { get; set; }
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; }
        [JsonProperty("scope")]
        public List<string> Scope { get; set; }
        [JsonProperty("channel_id")]
        public string ChannelId { get; set; }
        [JsonProperty("stream_name")]
        public string ChannelName { get; set; }
    }
}
