using Newtonsoft.Json;
using PlayerSpot.Twitchtv.ApiServices.Utils;
using System.Collections.Generic;


namespace PlayerSpot.Twitchtv.ApiServices.Contracts
{
    [JsonObject(ItemConverterType = typeof(TwitchTvListConverter))]
    public class TwitchTvList<T> : TwitchTvResponse
    {
        public List<T> List { get; set; }
    }
}
