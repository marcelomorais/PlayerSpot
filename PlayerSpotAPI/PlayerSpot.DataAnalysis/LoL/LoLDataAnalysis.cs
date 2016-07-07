using PlayerSpot.LoL.ApiServices.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlayerSpot.LoL.ApiServices.Models.Match;
using PlayerSpotAPI;
using static PlayerSpot.LoL.ApiServices.Models.RawMatch;

namespace PlayerSpot.DataAnalysis
{
    public class LoLDataAnalysis
    {
        public static List<RawMatch> GetVictoriesMatches(long targetPlayerId, List<RawMatch> matchList)
        {
            var winMatches = new List<RawMatch>();
            matchList.ForEach(match =>
            {
                var participantId = match.ParticipantIdentities.First(x => x.Player.SummonerId == targetPlayerId).ParticipantId;
                var summonerTeamId = match.Participants.First(participant => participant.ParticipantId == participantId).TeamId;
                if (match.Teams.First(x => x.Winner).TeamId == summonerTeamId)
                    winMatches.Add(match);

            });
            return winMatches;
        }

        public static int GetVictoriesAverage(long summonerId, List<RawMatch> rawMatches)
        {
            var victories = GetVictoriesMatches(summonerId, rawMatches);
            return (int)(victories.Count * 100.0 / rawMatches.Count);
        }

        public static List<RawMatch> GetFirstBloodMatches(long summonerId, List<RawMatch> rawMatches)
        {
            var stats = GetSummonerStats(summonerId, rawMatches);
            return stats.Where(x => x.Value.FirstBloodKill || x.Value.FirstBloodAssist).ToList().Select(x => x.Key).ToList();
        }

        public static int GetFirstBloodAverage(long summonerId, List<RawMatch> rawMatches)
        {
            var victories = GetFirstBloodMatches(summonerId, rawMatches);
            return (int)(victories.Count * 100.0 / rawMatches.Count);
        }

        public static Dictionary<RawMatch, RawMatch.Stats> GetSummonerStats(long summonerId, List<RawMatch> rawMatches)
        {
            var participants = GetSummonerParticipants(summonerId, rawMatches);
            return participants.ToDictionary(participant => participant.Key, participant => participant.Value.Stats);
        }

        public static Dictionary<RawMatch, RawMatch.Participant> GetSummonerParticipants(long summonerId, List<RawMatch> rawMatches)
        {
            var participants = new Dictionary<RawMatch, RawMatch.Participant>();
            rawMatches.ForEach(match =>
            {
                var participantId = match.ParticipantIdentities.First(x => x.Player.SummonerId == summonerId).ParticipantId;
                participants.Add(match, match.Participants.First(x => x.ParticipantId == participantId));

            });
            return participants;
        }

        public static Dictionary<RawMatch, List<Item>> GetItemList(long summonerId, List<RawMatch> rawMatches)
        {
            var stats = GetSummonerStats(summonerId, rawMatches);
            var itemsByRawMatch = new Dictionary<RawMatch, List<Item>>();
            foreach (var stat in stats)
            {
                List<Item> items = GetItemsByStats(stat.Value);
                itemsByRawMatch.Add(stat.Key, items);
            }
            return itemsByRawMatch;
        }

        public static List<Item> GetItemsByStats(RawMatch.Stats stat)
        {
            var items = new List<Item>();
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item0));
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item1));
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item2));
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item3));
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item4));
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item5));
            items.Add(MemoryCacher.GetValue<Item>("item_" + stat.Item6));
            return items;
        }

        public static Dictionary<Item, int> GetItemsAverage(long summonerId, List<RawMatch> rawMatches)
        {
            var itemList = GetItemList(summonerId, rawMatches);
            var itemsByAverage = new Dictionary<Item, int>();
            foreach (var items in itemList.Values)
            {
                foreach (var item in items)
                {
                    if (item == null)
                        continue;
                    if (!itemsByAverage.ContainsKey(item))
                    {
                        itemsByAverage[item] = 1;
                        continue;
                    }
                    itemsByAverage[item] += 1;
                }
            }

            var keysPairs = itemsByAverage.ToList();
            foreach (var i in keysPairs)
            {
                itemsByAverage[i.Key] = (int)(i.Value * 100.0 / rawMatches.Count);
            }
            return itemsByAverage;
        }

        public static float[] GetAverageKDA(long summonerId, List<RawMatch> rawMatches)
        {
            var stats = GetSummonerStats(summonerId, rawMatches);
            var kdaAverage = new float[4];
            foreach (var stat in stats.Values)
            {
                kdaAverage[0] += (float)stat.Kills / rawMatches.Count;
                kdaAverage[1] += (float)stat.Deaths / rawMatches.Count;
                kdaAverage[2] += (float)stat.Assists / rawMatches.Count;
            }
            kdaAverage[3] = (kdaAverage[0] + kdaAverage[2]) / Math.Max(1, kdaAverage[1]);
            return kdaAverage;
        }

        public static Dictionary<LaneEnum, Dictionary<Champion, int>> GetAverageChampions(long summonerId, List<RawMatch> rawMatches)
        {
            var champsByAverage = new Dictionary<LaneEnum, Dictionary<Champion, int>>();
            var lanesInfos = GetLanesInfosInMatches(summonerId, rawMatches).SelectMany(x => x.Value).ToList();
            var summonerChampionId = GetSummonerParticipants(summonerId, rawMatches).Values.ToList()[0].ChampionId;
            foreach (var lanesInfo in lanesInfos)
            {
                if (lanesInfo.Champion.Id == summonerChampionId || lanesInfo.SameTeam)
                    continue;
                if (!champsByAverage.ContainsKey(lanesInfo.Lane))
                {
                    champsByAverage[lanesInfo.Lane] = new Dictionary<Champion, int>();
                }
                if (!champsByAverage[lanesInfo.Lane].ContainsKey(lanesInfo.Champion))
                {
                    champsByAverage[lanesInfo.Lane][lanesInfo.Champion] = 1;
                    continue;
                }
                champsByAverage[lanesInfo.Lane][lanesInfo.Champion] += 1;
            }


            var keys = champsByAverage.Values.ToList();
            foreach (var value in keys)
            {
                var values = value.ToList();
                int total = value.Values.Sum(x => x);
                foreach (var v in values)
                {
                    value[v.Key] = (int)(v.Value * 100.0) / total;
                }
            }
            return champsByAverage;
        }

        public static Dictionary<RawMatch, List<LaneInfo>> GetLanesInfosInMatches(long summonerId, List<RawMatch> rawMatches)
        {
            var champions = new Dictionary<RawMatch, List<LaneInfo>>();
            var summonerParticipants = GetSummonerParticipants(summonerId, rawMatches).Values.ToList();

            for (int index = 0; index < rawMatches.Count; index++)
            {
                var summonerTeamId = summonerParticipants[index].TeamId;
                var rawMatch = rawMatches[index];
                foreach (var participant in rawMatch.Participants)
                {
                    if (!champions.ContainsKey(rawMatch))
                        champions[rawMatch] = new List<LaneInfo>();
                    champions[rawMatch].Add(new LaneInfo()
                    {
                        SameTeam = participant.TeamId == summonerTeamId,
                        Lane = (LaneEnum)Enum.Parse(typeof(LaneEnum), participant.Timeline.Lane),
                        Role = (RoleEnum)Enum.Parse(typeof(RoleEnum), participant.Timeline.Role),
                        Champion = MemoryCacher.GetValue<Champion>("champion_" + participant.ChampionId)
                    });
                }
            }
            return champions;
        }

        public static Dictionary<RawMatch, List<Event>> GetSummonerMatchEvents(long summonerId, List<RawMatch> rawMatches)
        {
            var summonerParticipants = GetSummonerParticipants(summonerId, rawMatches).Values.ToList();
            var matchEvents = new Dictionary<RawMatch, List<Event>>();
            for (int i = 0; i < rawMatches.Count; i++)
            {
                var participantId = summonerParticipants[i].ParticipantId;
                var rawMatch = rawMatches[i];
                var frames = rawMatch.TimeLine.Frames;
                var events = frames.Where(x => x.Events != null).SelectMany(x => x.Events).ToList();
                events.ForEach(x =>
                {
                    x.EventEnumType = (EventTypes)Enum.Parse(typeof(EventTypes), x.EventType);
                });
                matchEvents[rawMatch] = events.Where(x => x.CreatorId == participantId
                    || x.KillerId == participantId
                    || x.ParticipantId == participantId
                    || (x.AssistingParticipantIds != null && x.AssistingParticipantIds.Any(y => y == participantId))
                    || x.VictimId == participantId).ToList();
            }
            return matchEvents;
        }

        public static Dictionary<RawMatch, List<int>> GetSummonerSkillOrder(long summonerId, List<RawMatch> rawMatches)
        {
            var summonerEvents = GetSummonerMatchEvents(summonerId, rawMatches);
            var skillOrderPerMatch = new Dictionary<RawMatch, List<int>>();
            foreach (var matchEvents in summonerEvents)
            {
                var rawMatch = matchEvents.Key;
                if (!skillOrderPerMatch.ContainsKey(rawMatch))
                    skillOrderPerMatch[rawMatch] = new List<int>();
                var skillOrder = matchEvents.Value.Where(x => x.EventEnumType == EventTypes.SKILL_LEVEL_UP)
                    .Select(x => x.SkillSlot).ToList();
                skillOrderPerMatch[rawMatch] = skillOrder;
            }
            return skillOrderPerMatch;
        }

        public static Dictionary<int, Dictionary<int, int>> GetSummonerSkillOrderAverage(long summonerId, List<RawMatch> rawMatches)
        {
            var skillOrder = GetSummonerSkillOrder(summonerId, rawMatches);
            var skillAverage = new Dictionary<int, Dictionary<int, int>>();
            foreach (var skills in skillOrder.Values)
            {
                for (var i = 0; i < skills.Count; i++)
                {
                    if (!skillAverage.ContainsKey(i))
                    {
                        skillAverage[i] = new Dictionary<int, int>();
                        skillAverage[i].Add(skills[i], 1);
                        continue;
                    }
                    if (!skillAverage[i].ContainsKey(skills[i]))
                    {
                        skillAverage[i].Add(skills[i],1);
                        continue;
                    }
                    skillAverage[i][skills[i]] += 1;
                }
            }

            var skillAverageValue = skillAverage.Values.ToList();
            foreach (var skillOccurency in skillAverageValue)
            {
                var values = skillOccurency.ToList();
                var skillValues = skillOccurency.Values.Sum(x => x);
                foreach (var skill in values)
                {
                    skillOccurency[skill.Key] = (int)(skill.Value * 100.0) / skillValues;
                }
            }

            return skillAverage;
        }

        public static Dictionary<Champion, List<FrameEvent>> GetChampionsFrameEvents(RawMatch rawMatch, int? championId = null)
        {
            var matchsEvents = GetMatchEvents(rawMatch);
            var champions = GetMatchChampions(rawMatch);
            var championsFrameEvents = new Dictionary<Champion, List<FrameEvent>>();
            foreach (var matchsEvent in matchsEvents)
            {
                var champion = champions[matchsEvent.Key];

                if (championId == null || champion.Id == championId)
                    championsFrameEvents[champion] = matchsEvent.Value;
            }
            return championsFrameEvents;
        }

        public static Dictionary<RawMatch, Dictionary<Champion, List<FrameEvent>>> GetMatchesChampionsFrameEvents(
            List<RawMatch> rawMatches, List<int> championIdPerMatch = null)
        {
            if (championIdPerMatch == null)
                return rawMatches.ToDictionary(key => key, value => GetChampionsFrameEvents(value));

            var matchesChampionFrameEvents = new Dictionary<RawMatch, Dictionary<Champion, List<FrameEvent>>>();
            for (int i = 0; i < rawMatches.Count; i++)
            {
                var rawMatch = rawMatches[i];
                var summonerChampion = championIdPerMatch[i];
                matchesChampionFrameEvents.Add(rawMatch, GetChampionsFrameEvents(rawMatch, summonerChampion));
            }
            return matchesChampionFrameEvents;
        }

        public static Dictionary<long, List<FrameEvent>> GetMatchEvents(RawMatch rawMatch, params EventTypes[] args)
        {
            var summonerEvents = new Dictionary<long, List<FrameEvent>>();
            var summonerParticipants = rawMatch.ParticipantIdentities;
            var eventTypes = args.Any() ? args.ToList() : Enum.GetValues(typeof(EventTypes)).Cast<EventTypes>().ToList();
            foreach (var summonerParticipant in summonerParticipants)
            {
                var summonerId = summonerParticipant.Player.SummonerId;
                summonerEvents[summonerId] = new List<FrameEvent>();
                foreach (var timeLineFrame in rawMatch.TimeLine.Frames)
                {
                    var frameEvent = new FrameEvent();
                    var participantId = summonerParticipant.ParticipantId;

                    if (timeLineFrame.Events != null)
                    {
                        frameEvent.Events = timeLineFrame.Events.Where(x => (x.CreatorId == participantId
                        || x.KillerId == participantId
                        || x.ParticipantId == participantId
                        || (x.AssistingParticipantIds != null && x.AssistingParticipantIds.Any(y => y == participantId))
                        || x.VictimId == participantId) &&
                        (eventTypes.Contains((EventTypes)Enum.Parse(typeof(EventTypes), x.EventType)))).ToList();
                    }

                    frameEvent.SummonerFrame = timeLineFrame.ParticipantFrames[participantId];
                    frameEvent.Timestamp = timeLineFrame.Timestamp;
                    summonerEvents[summonerId].Add(frameEvent);
                }
            }
            return summonerEvents;
        }

        public static Dictionary<long, Champion> GetMatchChampions(RawMatch rawMatch)
        {
            var champions = new Dictionary<long, Champion>();
            foreach (var participant in rawMatch.ParticipantIdentities)
            {
                var participantInfos = rawMatch.Participants.First(x => x.ParticipantId == participant.ParticipantId);
                champions.Add(participant.Player.SummonerId, MemoryCacher.GetValue<Champion>("champion_" + participantInfos.ChampionId));
            }
            return champions;
        }

        public static List<CustomFrameEvent> GetEventsAvarageByTime(long summonerId, List<RawMatch> rawMatches)
        {
            var totalEvents = new List<FrameEvent>();
            var customFrameEvent = new List<CustomFrameEvent>();

            foreach (var match in rawMatches)
            {
                var participantId = match.ParticipantIdentities.First(x => x.Player.SummonerId == summonerId).ParticipantId;
                var matchEvents = GetMatchEvents(match, EventTypes.BUILDING_KILL, EventTypes.CHAMPION_KILL, EventTypes.ELITE_MONSTER_KILL, EventTypes.WARD_PLACED);
                matchEvents[summonerId].ForEach(x => x.MatchId = match.MatchId);
                totalEvents.AddRange(matchEvents[summonerId]);
            }

            foreach (var item in totalEvents)
            {
                var customEvent = customFrameEvent.FirstOrDefault(x => Convert.ToInt32(x.Timestamp / 1000) == Convert.ToInt32(item.Timestamp / 1000));

                if (customEvent == null)
                {
                    customEvent = new CustomFrameEvent()
                    {
                        Timestamp = Convert.ToInt32(item.Timestamp / 1000) * 1000,
                        Events = new Dictionary<string, List<Event>>(),
                        SummonerFrame = new Dictionary<string, RawMatch.FramesInfos>()
                    };
                    customFrameEvent.Add(customEvent);
                }

                customEvent.Events.Add(item.MatchId, item.Events);
                customEvent.SummonerFrame.Add(item.MatchId, item.SummonerFrame);
            }

            return customFrameEvent;
        }

        public static Dictionary<long, SummonerSpell[]> GetSummonerSpells(RawMatch rawMatch)
        {
            Dictionary<long, SummonerSpell[]> spellsBySummoner = new Dictionary<long, SummonerSpell[]>();
            foreach (var participant in rawMatch.Participants)
            {
                var identity = rawMatch.ParticipantIdentities.First(x => x.ParticipantId == participant.ParticipantId);
                SummonerSpell spell1 = MemoryCacher.GetValue<SummonerSpell>("spell_" + participant.Spell1Id);
                SummonerSpell spell2 = MemoryCacher.GetValue<SummonerSpell>("spell_" + participant.Spell2Id);
                spellsBySummoner.Add(identity.Player.SummonerId, new SummonerSpell[] { spell1, spell2 });
            }
            return spellsBySummoner;
        }

        public static Dictionary<SummonerSpell, int> GetSummonerSpellsAverage(long summonerId, List<RawMatch> rawMatches)
        {
            List<SummonerSpell[]> spells = rawMatches.Select(rawMatch => GetSummonerSpells(rawMatch)[summonerId]).ToList();
            Dictionary<SummonerSpell, int> spellByOcurrency = new Dictionary<SummonerSpell, int>();
            int totalSpellsUseds = spells.Count;

            foreach (var summonerSpellList in spells)
            {
                foreach (var summonerSpell in summonerSpellList)
                {
                    if(summonerSpell == null)
                        continue;
                    if (!spellByOcurrency.ContainsKey(summonerSpell))
                    {
                        spellByOcurrency[summonerSpell] = (int)100.0 / totalSpellsUseds;
                        continue;
                    }
                    spellByOcurrency[summonerSpell] += (int)100.0 / totalSpellsUseds;
                }
            }
            return spellByOcurrency;
        }

        public static Dictionary<long, List<MatchRune>> GetMatchRunes(RawMatch rawMatch)
        {
            var runeBySummoner = new Dictionary<long, List<MatchRune>>();
            foreach (var participant in rawMatch.Participants)
            {
                var identity = rawMatch.ParticipantIdentities.First(x => x.ParticipantId == participant.ParticipantId);
                var summonerId = identity.Player.SummonerId;
                if (!runeBySummoner.ContainsKey(summonerId))
                    runeBySummoner.Add(summonerId, participant.Runes);
                else
                {
                    runeBySummoner[summonerId].AddRange(participant.Runes);
                }
            }
            return runeBySummoner;
        }

        public static Dictionary<long, RunePage> GetMatchRunesPages(RawMatch rawMatch)
        {
            var runePagesBySummonerId = new Dictionary<long, RunePage>();
            var matchRunes = GetMatchRunes(rawMatch);
            foreach (var participant in rawMatch.Participants)
            {
                var summonerId = rawMatch.ParticipantIdentities.First(x => x.ParticipantId == participant.ParticipantId).Player.SummonerId;
                var participantRunes = matchRunes[summonerId];
                var runePage = new RunePage() { MatchId = rawMatch.MatchId, BlackRunes = new List<Rune>(), BlueRunes = new List<Rune>(), RedRunes = new List<Rune>(), YellowRunes = new List<Rune>() };
                foreach (var matchRune in participantRunes)
                {
                    var rune = MemoryCacher.GetValue<Rune>("rune_" + matchRune.Id);
                    if (rune == null)
                        continue;
                    rune.Count = matchRune.Rank;
                    var type = rune.RuneInfo.Type;
                    if (type == "red")
                        runePage.RedRunes.Add(rune);
                    else if (type == "yellow")
                        runePage.YellowRunes.Add(rune);
                    else if (type == "blue")
                        runePage.BlueRunes.Add(rune);
                    else if (type == "black")
                        runePage.BlackRunes.Add(rune);
                }
                runePagesBySummonerId.Add(summonerId, runePage);
            }
            return runePagesBySummonerId;
        }

        public static Dictionary<RunePage, int> GetRunePageAverage(long summonerId, List<RawMatch> rawMatches)
        {
            var runesByAverage = new Dictionary<RunePage, int>();
            var runesPageList = rawMatches.Select(rawMatch => GetMatchRunesPages(rawMatch)[summonerId]).ToList();
            var ignorePageRuneList = new List<RunePage>();
            foreach (var runePage in runesPageList)
            {
                if (runesByAverage.ContainsKey(runePage) || ignorePageRuneList.Contains(runePage))
                    continue;
                var otherSamePageRunes = runesPageList.Where(x => x != runePage && RunePage.UseSamesRunes(x, runePage)).ToList();
                otherSamePageRunes.Add(runePage);
                runesByAverage.Add(runePage, (int)(otherSamePageRunes.Count * 100.0 / rawMatches.Count));
                ignorePageRuneList.AddRange(otherSamePageRunes);
            }
            return runesByAverage;
        }

        public static Dictionary<long, List<MatchMastery>> GetMasteryByMatch(RawMatch rawMatch)
        {
            var mastery = new Dictionary<long, List<MatchMastery>>();

            foreach (var participant in rawMatch.Participants)
            {
                var identity = rawMatch.ParticipantIdentities.FirstOrDefault(x => x.ParticipantId == participant.ParticipantId);

                mastery.Add(identity.Player.SummonerId, participant.Masteries);
            }

            return mastery;
        }

        public static Dictionary<Mastery, int> GetMasteryAvarage(long summonerId, List<RawMatch> rawMatches)
        {
            var matchMasteryList = new Dictionary<int, List<MatchMastery>>();

            for (int i = 0; i < rawMatches.Count; i++)
            {
                var masteries = GetMasteryByMatch(rawMatches[i]).FirstOrDefault(x => x.Key == summonerId);

                matchMasteryList.Add(i, masteries.Value);
            }

            var total = matchMasteryList.Count;
            var masteryByAvarage = new Dictionary<Mastery, int>();

            foreach (var rawMastery in matchMasteryList)
            {
                foreach (var raw in rawMastery.Value)
                {
                    var mastery = MemoryCacher.GetValue<Mastery>(string.Concat("mastery_", raw.Id));
                    if (masteryByAvarage.ContainsKey(mastery))
                    {
                        masteryByAvarage[mastery] += (int)(100.0 / rawMastery.Value.Count);
                        continue;
                    }

                    masteryByAvarage.Add(mastery, (int)(100.0 / rawMastery.Value.Count));
                }
            }

            return masteryByAvarage;
        }
    }


}
