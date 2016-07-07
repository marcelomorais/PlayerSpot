using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PlayerSpot.Data.Interfaces;
using PlayerSpot.Data.Models;

namespace PlayerSpot.Data.Entities
{
    public class MockDataUser : IDataService
    {
        public List<PlayerSpotUser> _users = new List<PlayerSpotUser>();


        public MockDataUser(string filePath = "D:/StreamData.json")
        {
            if (!File.Exists(filePath))
            {
                return;
            }
            var data = File.ReadAllText(filePath);
            _users = JsonConvert.DeserializeObject<List<PlayerSpotUser>>(data);
        }

        public PlayerSpotUser GetUser(string userId, string streamId = "", string channelName = "")
        {
            return _users.FirstOrDefault(x => x.Id == userId || (x.TwitchUser != null && !string.IsNullOrEmpty(streamId) && x.TwitchUser.ChannelId.ToLowerInvariant() == streamId.ToLowerInvariant()) || (x.TwitchUser != null && !string.IsNullOrEmpty(channelName) && x.TwitchUser.ChannelName?.ToLowerInvariant() == channelName.ToLowerInvariant())) ?? new PlayerSpotUser();
        }
        public void SavePlayerSpotUser(PlayerSpotUser user)
        {
            _users.Add(user);
        }

        public List<PlayerSpotUser> GetAllUsers()
        {
            return _users;
        }
    }
}
