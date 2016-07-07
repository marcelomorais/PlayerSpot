using Newtonsoft.Json;
using PlayerSpot.LoL.ApiServices.Models.Match;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public class RawMatch
    {
        [JsonProperty("region")]
        public string Region { get; set; }
        [JsonProperty("matchType")]
        public string MatchType { get; set; }
        [JsonProperty("matchCreation")]
        public long MatchCreation { get; set; }
        [JsonProperty("timeline")]
        public Timeline TimeLine { get; set; }
        [JsonProperty("participants")]
        public List<Participant> Participants { get; set; }
        [JsonProperty("platformId")]
        public string PlatformId { get; set; }
        [JsonProperty("matchMode")]
        public string MatchMode { get; set; }
        [JsonProperty("participantIdentities")]
        public List<ParticipantIdentity> ParticipantIdentities { get; set; }
        [JsonProperty("matchVersion")]
        public string MatchVersion { get; set; }
        [JsonProperty("teams")]
        public List<Team> Teams { get; set; }
        [JsonProperty("mapId")]
        public int MapId { get; set; }
        [JsonProperty("season")]
        public string Season { get; set; }
        [JsonProperty("queueType")]
        public string QueueType { get; set; }
        [JsonProperty("matchId")]
        public string MatchId { get; set; }
        [JsonProperty("matchDuration")]
        public int MatchDuration { get; set; }

        public class Timeline
        {
            [JsonProperty("frameInterval")]
            public int FrameInterval { get; set; }
            [JsonProperty("frames")]
            public List<Frame> Frames { get; set; }
        }

        public class Frame
        {
            [JsonProperty("timestamp")]
            public int Timestamp { get; set; }
            [JsonProperty("participantFrames")]
            public Dictionary<int, FramesInfos> ParticipantFrames { get; set; }
            [JsonProperty("events")]
            public List<Event> Events { get; set; }
        }

        public class FramesInfos
        {
            [JsonProperty("currentGold")]
            public int CurrentGold { get; set; }
            [JsonProperty("position")]
            public Position Position { get; set; }
            [JsonProperty("minionsKilled")]
            public int MinionsKilled { get; set; }
            [JsonProperty("level")]
            public int Level { get; set; }
            [JsonProperty("jungleMinionsKilled")]
            public int JungleMinionsKilled { get; set; }
            [JsonProperty("totalGold")]
            public int TotalGold { get; set; }
            [JsonProperty("dominionScore")]
            public int DominionScore { get; set; }
            [JsonProperty("participantId")]
            public int ParticipantId { get; set; }
            [JsonProperty("xp")]
            public int Xp { get; set; }
            [JsonProperty("teamScore")]
            public int TeamScore { get; set; }
        }

        public class Position
        {
            [JsonProperty("y")]
            public int Y { get; set; }
            [JsonProperty("x")]
            public int X { get; set; }
        }

        public class Event
        {
            [JsonProperty("timestamp")]
            public int Timestamp { get; set; }
            [JsonProperty("levelUpType")]
            public string LevelUpType { get; set; }
            [JsonProperty("participantId")]
            public int ParticipantId { get; set; }
            [JsonProperty("eventType")]
            public string EventType { get; set; }
            public EventTypes EventEnumType { get; set; }
            [JsonProperty("skillSlot")]
            public int SkillSlot { get; set; }
            [JsonProperty("itemId")]
            public int ItemId { get; set; }
            [JsonProperty("creatorId")]
            public int CreatorId { get; set; }
            [JsonProperty("wardType")]
            public string WardType { get; set; }
            [JsonProperty("position")]
            public Position Position { get; set; }
            [JsonProperty("victimId")]
            public int VictimId { get; set; }
            [JsonProperty("killerId")]
            public int KillerId { get; set; }
            [JsonProperty("assistingParticipantIds")]
            public List<int> AssistingParticipantIds { get; set; }
            [JsonProperty("itemBefore")]
            public int ItemBefore { get; set; }
            [JsonProperty("itemAfter")]
            public int ItemAfter { get; set; }
            [JsonProperty("laneType")]
            public string LaneType { get; set; }
            [JsonProperty("buildingType")]
            public string BuildingType { get; set; }
            [JsonProperty("towerType")]
            public string TowerType { get; set; }
            [JsonProperty("teamId")]
            public int TeamId { get; set; }
            [JsonProperty("monsterType")]
            public string MonsterType { get; set; }
        }

        public class Participant
        {
            [JsonProperty("masteries")]
            public List<MatchMastery> Masteries { get; set; }
            [JsonProperty("stats")]
            public Stats Stats { get; set; }
            [JsonProperty("runes")]
            public List<MatchRune> Runes { get; set; }
            [JsonProperty("timeline")]
            public ParticipantTimelineData Timeline { get; set; }
            [JsonProperty("spell1Id")]
            public int Spell1Id { get; set; }
            [JsonProperty("spell2Id")]
            public int Spell2Id { get; set; }
            public SummonerSpell Spell1 { get; set; }
            public SummonerSpell Spell2 { get; set; }
            [JsonProperty("participantId")]
            public int ParticipantId { get; set; }
            [JsonProperty("championId")]
            public int ChampionId { get; set; }
            public Champion Champion { get; set; }
            [JsonProperty("teamId")]
            public int TeamId { get; set; }
            [JsonProperty("highestAchievedSeasonTier")]
            public string HighestAchievedSeasonTier { get; set; }

        }

        public class Stats
        {
            [JsonProperty("unrealKills")]
            public int UnrealKills { get; set; }
            [JsonProperty("item0")]
            public int Item0 { get; set; }
            [JsonProperty("item1")]
            public int Item1 { get; set; }
            [JsonProperty("item2")]
            public int Item2 { get; set; }
            [JsonProperty("item3")]
            public int Item3 { get; set; }
            [JsonProperty("item4")]
            public int Item4 { get; set; }
            [JsonProperty("item5")]
            public int Item5 { get; set; }
            [JsonProperty("item6")]
            public int Item6 { get; set; }
            [JsonProperty("items")]
            public List<Item> Items { get; set; }
            [JsonProperty("totalDamageTaken")]
            public int TotalDamageTaken { get; set; }
            [JsonProperty("pentaKills")]
            public int PentaKills { get; set; }
            [JsonProperty("sightWardsBoughtInGame")]
            public int SightWardsBoughtInGame { get; set; }
            [JsonProperty("winner")]
            public bool Winner { get; set; }
            [JsonProperty("magicDamageDealt")]
            public int MagicDamageDealt { get; set; }
            [JsonProperty("wardsKilled")]
            public int WardsKilled { get; set; }
            [JsonProperty("largestCriticalStrike")]
            public int LargestCriticalStrike { get; set; }
            [JsonProperty("trueDamageDealt")]
            public int TrueDamageDealt { get; set; }
            [JsonProperty("doubleKills")]
            public int DoubleKills { get; set; }
            [JsonProperty("physicalDamageDealt")]
            public int PhysicalDamageDealt { get; set; }
            [JsonProperty("tripleKills")]
            public int TripleKills { get; set; }
            [JsonProperty("deaths")]
            public int Deaths { get; set; }
            [JsonProperty("firstBloodAssist")]
            public bool FirstBloodAssist { get; set; }
            [JsonProperty("magicDamageDealtToChampions")]
            public int MagicDamageDealtToChampions { get; set; }
            [JsonProperty("assists")]
            public int Assists { get; set; }
            [JsonProperty("visionWardsBoughtInGame")]
            public int VisionWardsBoughtInGame { get; set; }
            [JsonProperty("totalTimeCrowdControlDealt")]
            public int TotalTimeCrowdControlDealt { get; set; }
            [JsonProperty("champLevel")]
            public int ChampLevel { get; set; }
            [JsonProperty("physicalDamageTaken")]
            public int PhysicalDamageTaken { get; set; }
            [JsonProperty("totalDamageDealt")]
            public int TotalDamageDealt { get; set; }
            [JsonProperty("largestKillingSpree")]
            public int LargestKillingSpree { get; set; }
            [JsonProperty("inhibitorKills")]
            public int InhibitorKills { get; set; }
            [JsonProperty("minionsKilled")]
            public int MinionsKilled { get; set; }
            [JsonProperty("towerKills")]
            public int TowerKills { get; set; }
            [JsonProperty("physicalDamageDealtToChampions")]
            public int PhysicalDamageDealtToChampions { get; set; }
            [JsonProperty("quadraKills")]
            public int QuadraKills { get; set; }
            [JsonProperty("goldSpent")]
            public int GoldSpent { get; set; }
            [JsonProperty("totalDamageDealtToChampions")]
            public int TotalDamageDealtToChampions { get; set; }
            [JsonProperty("goldEarned")]
            public int GoldEarned { get; set; }
            [JsonProperty("neutralMinionsKilledTeamJungle")]
            public int NeutralMinionsKilledTeamJungle { get; set; }
            [JsonProperty("firstBloodKill")]
            public bool FirstBloodKill { get; set; }
            [JsonProperty("firstTowerKill")]
            public bool FirstTowerKill { get; set; }
            [JsonProperty("wardsPlaced")]
            public int WardsPlaced { get; set; }
            [JsonProperty("trueDamageDealtToChampions")]
            public int TrueDamageDealtToChampions { get; set; }
            [JsonProperty("killingSprees")]
            public int KillingSprees { get; set; }
            [JsonProperty("firstInhibitorKill")]
            public bool FirstInhibitorKill { get; set; }
            [JsonProperty("totalScoreRank")]
            public int TotalScoreRank { get; set; }
            [JsonProperty("totalUnitsHealed")]
            public int TotalUnitsHealed { get; set; }
            [JsonProperty("kills")]
            public int Kills { get; set; }
            [JsonProperty("firstInhibitorAssist")]
            public bool FirstInhibitorAssist { get; set; }
            [JsonProperty("totalPlayerScore")]
            public int TotalPlayerScore { get; set; }
            [JsonProperty("neutralMinionsKilledEnemyJungle")]
            public int NeutralMinionsKilledEnemyJungle { get; set; }
            [JsonProperty("magicDamageTaken")]
            public int MagicDamageTaken { get; set; }
            [JsonProperty("largestMultiKill")]
            public int LargestMultiKill { get; set; }
            [JsonProperty("totalHeal")]
            public int TotalHeal { get; set; }
            [JsonProperty("objectivePlayerScore")]
            public int ObjectivePlayerScore { get; set; }
            [JsonProperty("firstTowerAssist")]
            public bool FirstTowerAssist { get; set; }
            [JsonProperty("trueDamageTaken")]
            public int TrueDamageTaken { get; set; }
            [JsonProperty("neutralMinionsKilled")]
            public int NeutralMinionsKilled { get; set; }
            [JsonProperty("combatPlayerScore")]
            public int CombatPlayerScore { get; set; }
        }

        public class ParticipantTimelineData
        {
            [JsonProperty("xpDiffPerMinDeltas")]
            public PerMinDeltas XpDiffPerMinDeltas { get; set; }
            [JsonProperty("damageTakenDiffPerMinDeltas")]
            public PerMinDeltas DamageTakenDiffPerMinDeltas { get; set; }
            [JsonProperty("xpPerMinDeltas")]
            public PerMinDeltas XpPerMinDeltas { get; set; }
            [JsonProperty("goldPerMinDeltas")]
            public PerMinDeltas GoldPerMinDeltas { get; set; }
            [JsonProperty("role")]
            public string Role { get; set; }
            [JsonProperty("creepsPerMinDeltas")]
            public PerMinDeltas CreepsPerMinDeltas { get; set; }
            [JsonProperty("csDiffPerMinDeltas")]
            public PerMinDeltas CsDiffPerMinDeltas { get; set; }
            [JsonProperty("damageTakenPerMinDeltas")]
            public PerMinDeltas DamageTakenPerMinDeltas { get; set; }
            [JsonProperty("lane")]
            public string Lane { get; set; }
        }


        public class PerMinDeltas
        {
            [JsonProperty("zeroToTen")]
            public float ZeroToTen { get; set; }
            [JsonProperty("tenToTwenty")]
            public float TenToTwenty { get; set; }
        }

        public class ParticipantIdentity
        {
            [JsonProperty("player")]
            public Player Player { get; set; }
            [JsonProperty("participantId")]
            public int ParticipantId { get; set; }
        }

        public class Player
        {
            [JsonProperty("profileIcon")]
            public int ProfileIcon { get; set; }
            [JsonProperty("matchHistoryUri")]
            public string MatchHistoryUri { get; set; }
            [JsonProperty("SummonerName")]
            public string summonerName { get; set; }
            [JsonProperty("summonerId")]
            public int SummonerId { get; set; }
        }

        public class Team
        {
            [JsonProperty("inhibitorKills")]
            public int InhibitorKills { get; set; }
            [JsonProperty("dominionVictoryScore")]
            public int DominionVictoryScore { get; set; }
            [JsonProperty("bans")]
            public List<BannedChampion> Bans { get; set; }
            [JsonProperty("towerKills")]
            public int TowerKills { get; set; }
            [JsonProperty("firstTower")]
            public bool FirstTower { get; set; }
            [JsonProperty("firstBlood")]
            public bool FirstBlood { get; set; }
            [JsonProperty("firstBaron")]
            public bool FirstBaron { get; set; }
            [JsonProperty("firstInhibitor")]
            public bool FirstInhibitor { get; set; }
            [JsonProperty("firstDragon")]
            public bool FirstDragon { get; set; }
            [JsonProperty("winner")]
            public bool Winner { get; set; }
            [JsonProperty("vilemawKills")]
            public int VilemawKills { get; set; }
            [JsonProperty("baronKills")]
            public int BaronKills { get; set; }
            [JsonProperty("dragonKills")]
            public int DragonKills { get; set; }
            [JsonProperty("teamId")]
            public int TeamId { get; set; }
        }
    }
}
