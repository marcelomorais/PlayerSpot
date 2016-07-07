using Microsoft.VisualStudio.TestTools.UnitTesting;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Service;
using PlayerSpot.Twitchtv.ApiServices.Client;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpotAPI.Tests.Unit
{
    [TestClass]
    public class TwitchTvApiTests
    {
        private ITwitchTvService _twitchTvService;

        [TestInitialize]
        public void Init()
        {
            _twitchTvService = new TwitchTvService();
        }

        [TestMethod]
        public void GetStream_VerifyConnectivity_ReturnJson()
        {
            var request = new TwitchTvRequest() { Game = "League of Legends", Channels = "", Language = "pt", Limit = 100 };

            var response = _twitchTvService.GetStreams(request.Language, request.Game, request.Offset, request.Limit, request.Client_Id, request.Stream_Type);

            Assert.IsNotNull(response);
            Assert.IsInstanceOfType(response, typeof(TwitchTvResponse));
        }
    }
}
