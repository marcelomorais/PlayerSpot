using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Data.Models
{
    public class GameInfo
    {
        public enum GameName
        {
            LeagueOfLegends,
        }
        public GameName Name;
        public string PlayerInfo;

        public static GameName TryGetName(string game)
        {
            //TODO: Implementar conversão da string para o Enum.
            return GameName.LeagueOfLegends;
        }
    }
}
