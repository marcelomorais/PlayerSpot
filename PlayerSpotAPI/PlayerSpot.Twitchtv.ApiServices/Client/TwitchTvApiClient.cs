using PlayerSpot.Twitchtv.ApiServices.Client.Interface;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using PlayerSpot.Twitchtv.ApiServices.Models;
using PlayerSpot.Twitchtv.ApiServices.Utils;
using RestSharp;
using RestSharp.Deserializers;
using System.Collections.Generic;
using System;
using System.Net;
using Newtonsoft.Json;

namespace PlayerSpot.Twitchtv.ApiServices.Client
{
    public class TwitchTvApiClient : ITwitchTvApiClient
    {
        protected IDeserializer JsonDeserializer { get; set; }
        protected TwitchTvApiConnection connection { get; set; }
        public TwitchTvApiClient()
        {
            connection = new TwitchTvApiConnection();
            JsonDeserializer = new DynamicJsonDeserializer();
        }

        public TwitchTvList<Stream> GetStreams(TwitchTvRequest request)
        {
            var apiRequest = connection.Connect("/kraken/streams", Method.GET);
            connection.AddParameters(request, apiRequest);

            var response = connection.SendRequest(apiRequest);

            return JsonDeserializer.Deserialize<TwitchTvList<Stream>>(response);
        }

        public Streamer GetStreamer(TwitchTvRequest request)
        {
            
            var apiRequestChannel = connection.Connect(string.Format("/kraken/streams/{0}",request.Name), Method.GET);
            var apiRequestPanel = connection.Connect(string.Format("/api/channels/{0}/panels", request.Name), Method.GET);
            var response = connection.SendRequest(apiRequestChannel);
            var responsePanel = connection.SendRequest(apiRequestPanel);
            
            Streamer streamer = new Streamer();
            if(response.StatusCode == HttpStatusCode.OK)
                streamer.stream = JsonDeserializer.Deserialize<StreamResult>(response)?.Stream;
            if (responsePanel.StatusCode == HttpStatusCode.OK)
                streamer.panel = JsonConvert.DeserializeObject<List<Panel>>(responsePanel.Content);

            return streamer;
        }
    }
}
