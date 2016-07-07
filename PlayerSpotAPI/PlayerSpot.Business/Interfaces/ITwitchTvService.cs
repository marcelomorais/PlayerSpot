using PlayerSpot.Twitchtv.ApiServices.Contracts;
using PlayerSpot.Twitchtv.ApiServices.Models;
using System.Collections.Generic;

namespace PlayerSpot.Business.Interfaces
{
    public interface ITwitchTvService
    {
        Dictionary<string, List<Dictionary<string, string>>> GetStreams(string language, string game, int offset, int limit, long client_id, string stream_type);
        TwitchTvList<Stream> GetRawStreams(string language, string game, int offset, int limit, long client_id, string stream_type);
        Streamer GetStreamer(string name);
    }
}
