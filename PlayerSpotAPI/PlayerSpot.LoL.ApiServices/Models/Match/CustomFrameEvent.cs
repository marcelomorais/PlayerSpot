using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models.Match
{
    public class CustomFrameEvent
    {
        public Dictionary<string, RawMatch.FramesInfos> SummonerFrame { get; set; }
        public Dictionary<string, List<RawMatch.Event>> Events { get; set; }
        public long Timestamp { get; set; }
    }
}
