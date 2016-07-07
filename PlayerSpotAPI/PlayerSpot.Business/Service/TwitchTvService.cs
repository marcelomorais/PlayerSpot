using PlayerSpot.Business.Interfaces;
using PlayerSpot.Twitchtv.ApiServices.Client;
using PlayerSpot.Twitchtv.ApiServices.Client.Interface;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using PlayerSpot.Twitchtv.ApiServices.Models;
using System.Collections.Generic;
using System.Linq;


namespace PlayerSpot.Business.Service
{
    public class TwitchTvService : ITwitchTvService
    {
        private readonly ITwitchTvApiClient _apiClient;

        public TwitchTvService()
        {
            _apiClient = new TwitchTvApiClient();
        }
        public Dictionary<string, List<Dictionary<string, string>>> GetStreams(string language, string game, int offset, int limit, long client_id, string stream_type)
        {
            var response = GetRawStreams(language, game, offset, limit, client_id, stream_type);
            var retorno = new Dictionary<string, List<Dictionary<string, string>>>();
            var resp = new List<Dictionary<string, string>>();
            
            response.List.ForEach(x => resp.Add(new Dictionary<string, string>()
            {
                {"_id", x.Id.ToString()},
                {"name", x.Channel.Name },
                { "status", x.Channel.Status},
                { "viewers", x.Viewers.ToString()},
                { "user", x.Channel.DisplayName},
                { "logo", x.Channel.Logo },
                { "baner", string.IsNullOrEmpty(x.Channel.Banner) ? x.Channel.ProfileBanner : x.Channel.Banner },
                { "url", x.Channel.Url},
                { "image", x.Preview.Medium},
                { "game", x.Game},
                { "created_at", x.CreatedAt.ToString()}
            }));
            retorno.Add("streams", resp);
            return retorno;
        }

        public TwitchTvList<Stream> GetRawStreams(string language, string game, int offset, int limit, long client_id,
            string stream_type)
        {
            var request = new TwitchTvRequest()
            {
                Language = language,
                Game = game,
                Limit = limit,
                Offset = offset,
                Client_Id = client_id,
                Stream_Type = stream_type
            };

            var response = _apiClient.GetStreams(request);
            return response;
        }

        public Streamer GetStreamer(string name)
        {
            var request = new TwitchTvRequest() { Name = name };
            return _apiClient.GetStreamer(request);
        }
    }
}
