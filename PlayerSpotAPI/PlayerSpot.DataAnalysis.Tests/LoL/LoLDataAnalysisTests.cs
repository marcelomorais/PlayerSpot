using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using PlayerSpot.LoL.ApiServices.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;
using PlayerSpot.DataAnalysis.Tests.LoL;
using Newtonsoft.Json;
using PlayerSpot.DataAnalysis;
using PlayerSpot.LoL.ApiServices.Models.Match;
using PlayerSpotAPI;
using PlayerSpotAPI.Helpers;

namespace PlayerSpot.DataAnalysis.Tests
{
    [TestClass]
    public class LoLDataAnalysisTests
    {
        List<RawMatch> RawMatches;
        private long TestMatchId = 772027880;
        public long SummonerId = 421890;
        

        #region Init
        [TestInitialize]
        public void Init()
        {
            LoadMatches();
            LoadStaticData();
        }

        public void LoadMatches()
        {
            RawMatches = new List<RawMatch>();
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._772449710)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._772456949)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777179428)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777244703)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777257924)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777325957)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777331863)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777505453)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777517837)
            ));
            RawMatches.Add(JsonConvert.DeserializeObject<RawMatch>(
                System.Text.Encoding.UTF8.GetString(Matches._777590858)
            ));


        }

        public void LoadStaticData()
        {
            
            var champions = JsonConvert.DeserializeObject<Dictionary<string, Champion>>(Encoding.UTF8.GetString(StaticData.champion));
            foreach (var champion in champions)
            {
                MemoryCacher.Add("champion_" + champion.Key, champion.Value, null);
            }

            var spells = JsonConvert.DeserializeObject<Dictionary<string, SummonerSpell>>(Encoding.UTF8.GetString(StaticData.summoner_spell));
            foreach (var spell in spells)
            {
                MemoryCacher.Add("spell_" + spell.Key, spell.Value, null);
            }
            var items = JsonConvert.DeserializeObject<Dictionary<string, Item>>(Encoding.UTF8.GetString(StaticData.item));
            foreach (var item in items)
            {
                MemoryCacher.Add("item_" + item.Key, item.Value, null);
            }

            var runes = JsonConvert.DeserializeObject<Dictionary<string, Rune>>(Encoding.UTF8.GetString(StaticData.rune));
            foreach (var rune in runes)
            {
                MemoryCacher.Add("rune_" + rune.Key, rune.Value, null);
            }

            var masteries = JsonConvert.DeserializeObject<Dictionary<string, Mastery>>(Encoding.UTF8.GetString(StaticData.mastery));
            foreach (var mastery in masteries)
            {
                MemoryCacher.Add("mastery_" + mastery.Key, mastery.Value, null);
            }
        }
        #endregion

     

        [TestMethod]
        public void LeagueDataAnalysis_LoadMatches_Expect10()
        {
            Assert.AreEqual(RawMatches.Count, 10);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetWinMatches()
        {
            var wins = LoLDataAnalysis.GetVictoriesMatches(SummonerId, RawMatches);
            Assert.AreEqual(6, wins.Count);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetFirstBloodMatches()
        {
            var firstBloods = LoLDataAnalysis.GetFirstBloodMatches(SummonerId, RawMatches);
            Assert.AreEqual(4, firstBloods.Count);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetItemsList()
        {
            var items = LoLDataAnalysis.GetItemList(SummonerId, RawMatches);
            Assert.AreEqual(70, items.Values.Sum(x => x.Count));
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetItemsAverage()
        {
            var itemsAverage = LoLDataAnalysis.GetItemsAverage(SummonerId, RawMatches);
            Assert.IsTrue(true);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetAverageKDA()
        {
            var kdaAverage = LoLDataAnalysis.GetAverageKDA(SummonerId, RawMatches);
            Assert.IsTrue(kdaAverage.Length == 4);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetAverageChampions()
        {
            var averageChamps = LoLDataAnalysis.GetAverageChampions(SummonerId, RawMatches);
            Assert.AreEqual(100, averageChamps[LaneEnum.TOP].Values.Sum(x => x));
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetSummonerEvents()
        {
            var matchEvents = LoLDataAnalysis.GetSummonerMatchEvents(SummonerId, RawMatches);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetSummonerSkillOrder()
        {
            var skillOrder = LoLDataAnalysis.GetSummonerSkillOrder(SummonerId, RawMatches);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetSummonerSkillOrderAverage()
        {
            var skillOrderAverage = LoLDataAnalysis.GetSummonerSkillOrderAverage(SummonerId, RawMatches);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetMatchEvents()
        {
            var framesEvents = LoLDataAnalysis.GetMatchEvents(RawMatches.First());
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetMatchEventsByTypes()
        {
            var framesEvents = LoLDataAnalysis.GetEventsAvarageByTime(SummonerId, RawMatches);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetChampionsFrameEvents()
        {
            var matchEventsByChampion = LoLDataAnalysis.GetChampionsFrameEvents(RawMatches.First());
            //foreach (var v in matchEventsByChampion)
            //{

            //    var championString = JsonConvert.SerializeObject(v.Key);
            //    var events = JsonConvert.SerializeObject(v.Value);
            //    var obj = ResponseHelpers.AddJsonWrapper(new[] { "champion", "events" },
            //            new List<object>() { championString, events });
            //    var js = new JavaScriptSerializer();
            //    var k = js.Serialize(obj);

            //}
        }


        [TestMethod]
        public void LeagueDataAnalysis_GetMatchesChampionsFrameEvents()
        {
            var matchesFramesEvents = LoLDataAnalysis.GetMatchesChampionsFrameEvents(RawMatches);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetSummonerSpells()
        {
            var spells = LoLDataAnalysis.GetSummonerSpells(RawMatches.First());
            Assert.AreEqual(spells.Values.First().Length,2);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetSummonerSpellsAverage()
        {
            var spellsAverage = LoLDataAnalysis.GetSummonerSpellsAverage(SummonerId, RawMatches);
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetMatchRunesPages()
        {
            var mathRunes = LoLDataAnalysis.GetMatchRunesPages(RawMatches.First());

        }

        [TestMethod]
        public void LeagueDataAnalysis_GetRunePageAverage()
        {
            var runes = LoLDataAnalysis.GetRunePageAverage(SummonerId, RawMatches);

        }
        [TestMethod]
        public void LeagueDataAnalysis_GetMasteryFromMatch()
        {
            var matchesFramesEvents = LoLDataAnalysis.GetMasteryByMatch(RawMatches.FirstOrDefault());
        }

        [TestMethod]
        public void LeagueDataAnalysis_GetMasteryAvarage()
        {
            LoLDataAnalysis.GetMasteryAvarage(SummonerId ,RawMatches);
        }
    }
}
