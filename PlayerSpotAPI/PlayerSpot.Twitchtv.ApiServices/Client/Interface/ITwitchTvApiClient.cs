using PlayerSpot.Twitchtv.ApiServices.Contracts;
using PlayerSpot.Twitchtv.ApiServices.Models;
using System.Collections.Generic;

namespace PlayerSpot.Twitchtv.ApiServices.Client.Interface
{
    public interface ITwitchTvApiClient
    {
        TwitchTvList<Stream> GetStreams(TwitchTvRequest request);
        Streamer GetStreamer(TwitchTvRequest request);        
    }
}
