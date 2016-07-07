using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlayerSpot.Data.Models;

namespace PlayerSpot.Data.Interfaces
{
    public interface IDataService
    {
        PlayerSpotUser GetUser(string userId, string streamId = "" , string channelName = "");
        void SavePlayerSpotUser(PlayerSpotUser user);
        List<PlayerSpotUser> GetAllUsers();
    }
}
