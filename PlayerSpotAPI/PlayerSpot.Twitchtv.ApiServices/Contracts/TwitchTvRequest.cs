using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Twitchtv.ApiServices.Contracts
{
    public class TwitchTvRequest
    {
        public long Client_Id { get; set; }
        public string Language { get; set; }
        public string Game { get; set; }
        public string Channels { get; set; }
        public int Limit { get; set; }
        public int Offset { get; set; }
        public string Stream_Type { get; set; }
        public string Name { get; set; }

    }
}
