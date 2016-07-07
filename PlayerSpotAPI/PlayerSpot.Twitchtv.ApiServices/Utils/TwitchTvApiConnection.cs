using PlayerSpot.Twitchtv.ApiServices.Contracts;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Twitchtv.ApiServices.Utils
{
    public class TwitchTvApiConnection
    {
        public IRestClient RestClient { get; set; }
        public const string _connectionApiUrl = "https://api.twitch.tv"; //passar isso para o appsetings depois.

        public TwitchTvApiConnection()
        {
            RestClient = new RestClient { BaseUrl = new Uri(_connectionApiUrl) };
        }

        public RestRequest Connect(string url, Method method)
        {
            var request = new RestRequest(url, method) { RequestFormat = DataFormat.Json };
            request.AddHeader("Content-Type", "application/vnd.twitchtv.v3+json");

            return request;
        }

        public IRestResponse SendRequest(RestRequest parameters)
        {
            return RestClient.Execute(parameters);
        }

        public void AddParameters(TwitchTvRequest twitchRequest, RestRequest request)
        {
            if (!string.IsNullOrEmpty(twitchRequest.Game))
                request.AddParameter("game", twitchRequest.Game);
            if (!string.IsNullOrEmpty(twitchRequest.Name))
                request.AddParameter("name", twitchRequest.Name);

            if (!string.IsNullOrEmpty(twitchRequest.Channels))
                request.AddParameter("channel", twitchRequest.Channels);

            if (twitchRequest.Client_Id != default(long))
                request.AddParameter("client_id", twitchRequest.Client_Id);

            if (!string.IsNullOrEmpty(twitchRequest.Language))
                request.AddParameter("language", twitchRequest.Language);

            if (!string.IsNullOrEmpty(twitchRequest.Stream_Type))
                request.AddParameter("stream_Type", twitchRequest.Stream_Type);

            if (twitchRequest.Offset != default(int))
                request.AddParameter("stream_Type", twitchRequest.Stream_Type);

            if (twitchRequest.Limit != default(int))
                request.AddParameter("limit", twitchRequest.Limit);
        }
    }
}
