using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlayerSpot.LoL.ApiServices.Models;

namespace PlayerSpot.Business.Models
{
    public class UserGameAnalysis
    {
        public float[] KDA { get; set; }
        public Dictionary<Item, int> Items { get; set; }
        public Dictionary<RunePage, int> Runes { get; set; }
        public Dictionary<SummonerSpell, int> Spells { get; set; }
        public Dictionary<int, Dictionary<int, int>> Skills { get; set; }
    }
}
