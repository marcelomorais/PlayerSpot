using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Service;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpot.Twitchtv.ApiServices.Client;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PlayerSpotAPI.Tests.Unit
{
    [TestClass]
    public class LoLAPITests
    {
        private ILoLService _lolService;
        private long TestMatchId = 772027880;
        public long SummonerId = 421890;
        [TestInitialize]
        public void Init()
        {
            _lolService = new LoLService();

        }

        [Ignore]
        [TestMethod]
        public void LeagueDataAnalysis_CreateJsonFiles()
        {
            var rawMatches = _lolService.GetRawMatches(SummonerId, true, 10);
            foreach (var rawMatch in rawMatches)
            {
                File.WriteAllText("D:/" + rawMatch.MatchId + ".json", JsonConvert.SerializeObject(rawMatch));
                Thread.Sleep(1000);
            }
            Assert.AreEqual(10, rawMatches.Count);
        }

        [TestMethod]
        public void LoLMemoryCacher_ValidateIfHasValue_ReturnFalse()
        {
            var rawMatches = _lolService.GetRawMatch(772449710, false);

            Assert.IsInstanceOfType(rawMatches, typeof(RawMatch));
        }

    }
}
