using Newtonsoft.Json;
using PlayerSpot.Twitchtv.ApiServices.Models;

namespace PlayerSpot.Twitchtv.ApiServices.Models
{
    public class StreamResult
    {
        [JsonProperty("stream")]
        public Stream Stream { get; set; }
    }
}
