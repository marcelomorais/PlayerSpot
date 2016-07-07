using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Service;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpotAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PlayerSpot.Business.DataBinders
{
    public class LoLServiceBinder
    {
        private static ILoLService service;

        public LoLServiceBinder(ILoLService _service)
        {
            service = _service;
        }

        public static CurrentMatch CurrentMatchData(CurrentMatch match)
        {
            if (match.GameId == null)
                return null;
            if (match.BannedChampions[0].Champion != null)
                return match;
            match.Participants.ForEach(participant =>
            {
                participant.Champion = MemoryCacher.GetValue<Champion>("champion_" + participant.ChampionId);
                participant.Spell1 = MemoryCacher.GetValue<SummonerSpell>("spell_" + participant.Spell1Id);
                participant.Spell2 = MemoryCacher.GetValue<SummonerSpell>("spell_" + participant.Spell2Id);
                participant.ProfileIcon = MemoryCacher.GetValue<ProfileIcon>("profileIcon_" + participant.ProfileIconId);
                participant.Summoner = service.GetSummoner(participant.SummonerId, true);
                participant.Masteries.ForEach(mastery =>
                {
                    mastery.Mastery = MemoryCacher.GetValue<Mastery>("mastery_" + mastery.Id);
                });
                participant.Runes.ForEach(rune =>
                {
                    rune.Rune = MemoryCacher.GetValue<Rune>("rune_" + rune.Id);
                });
                Thread.Sleep(5000);
            });
            match.BannedChampions.ForEach(bannedChampion =>
            {
                bannedChampion.Champion = MemoryCacher.GetValue< Champion>("champion_" + bannedChampion.ChampionId);
            });
            return match;
        }
    }
}
