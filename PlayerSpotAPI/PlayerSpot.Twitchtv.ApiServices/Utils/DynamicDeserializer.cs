using Newtonsoft.Json;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using RestSharp;
using RestSharp.Deserializers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Twitchtv.ApiServices.Utils
{
    public class DynamicJsonDeserializer : IDeserializer
    {
        public string RootElement { get; set; }
        public string Namespace { get; set; }
        public string DateFormat { get; set; }

        public T Deserialize<T>(IRestResponse response)
        {
            return JsonConvert.DeserializeObject<T>(response.Content, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore, Converters = new JsonConverter[] { new TwitchTvListConverter() } });
        }

        public string Serialize<T>(TwitchTvList<T> list)
        {
            return JsonConvert.SerializeObject(list, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore, Converters = new JsonConverter[] { new TwitchTvListConverter() } });
        }
    }
}
