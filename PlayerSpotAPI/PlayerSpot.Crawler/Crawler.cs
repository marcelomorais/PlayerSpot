using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Timers;
using Newtonsoft.Json;
using PlayerSpot.Business.Interfaces;
using PlayerSpot.Business.Service;
using PlayerSpot.Data.Entities;
using PlayerSpot.Data.Interfaces;
using PlayerSpot.Data.Models;
using Stream = PlayerSpot.Twitchtv.ApiServices.Models.Stream;


namespace PlayerSpot.Crawler
{
    class Crawler
    {
        static DataService dataService = new DataService();
        static ITwitchTvService _twitchService = new TwitchTvService();
        static ILoLService lolService = new LoLService();
        static IDataService dataServce = new MockDataUser();
        private static int intervalMinutes = 15;
        static Dictionary<long, List<long>> knowStreamers = new Dictionary<long, List<long>>();
        static List<PlayerSpotUser> createdUsers = new List<PlayerSpotUser>();
        private static bool createUserData = true;

        static void Main(string[] args)
        {
            
            knowStreamers.Add(21492816384, new List<long>() { 21173114 });
            knowStreamers.Add(21599650224, new List<long>() { 479257 });
            knowStreamers.Add(21598853184, new List<long>() { 3202019 });
            knowStreamers.Add(21595912832, new List<long>() { 991040 });
            knowStreamers.Add(21599332912, new List<long>() { 479257 });
            knowStreamers.Add(21599672864, new List<long>() { 671888 });
            knowStreamers.Add(21600289008, new List<long>() { 3529014 });
            knowStreamers.Add(21599132864, new List<long>() { 2791440 });
            knowStreamers.Add(21617659152, new List<long>() { 1971952 });
            knowStreamers.Add(21614554432, new List<long>() { 20024283 }); //Daniels
            knowStreamers.Add(21633841200, new List<long>() { 18260200 }); //2451524
            knowStreamers.Add(52203144, new List<long>() { 2451524 }); //Gratis 150ml
            createdUsers = dataServce.GetAllUsers();
            if(createdUsers == null)
                createdUsers = new List<PlayerSpotUser>();
            Console.WriteLine("Inicializando Crawler");
            GetStreamsAndSave();
            Timer timer = new Timer(intervalMinutes * 60 * 1000);
            timer.Elapsed += OnTick;
            timer.Start();
            Console.ReadLine();
        }

        private static void OnTick(object sender, ElapsedEventArgs e)
        {
            Console.WriteLine("Pegando lista de streams");
            GetStreamsAndSave();
        }

        private static void GetStreamsAndSave()
        {
            var streams = _twitchService.GetRawStreams("pt-br", "league of legends", 0, 0, 0, "").List;
            var streamsToSave = streams.ToList();
            Console.WriteLine("Publico BR: " + streams.Sum(x => x.Viewers));
            foreach (var stream in streams){
                
                if (!createUserData || stream.Channel == null)
                    continue;
                Console.WriteLine(String.Format("Stream Pega Id: {0} Name: {1} Viewrs: {2}", stream.Id, stream.Channel.Name, stream.Viewers));
                var gamesInfos = new List<GameInfo>();
                if (knowStreamers.ContainsKey(stream.Channel.Id))
                {
                    foreach (var summonerData in knowStreamers[stream.Channel.Id])
                    {
                        var info = new GameInfo()
                        {
                            Name = GameInfo.GameName.LeagueOfLegends,
                            PlayerInfo = summonerData.ToString()
                        };
                        gamesInfos.Add(info);
                    }
                }
                TrySaveUser(stream, gamesInfos);
            }
            //dataService.SaveStreams(streamsToSave);

            if (createUserData)
            {
                PersistData(createdUsers);
            }
        }

        private static void PersistData(List<PlayerSpotUser> playerSpotUsers)
        {
            File.WriteAllText("D:/StreamData.json", JsonConvert.SerializeObject(playerSpotUsers, Formatting.Indented));
        }

        private static void TrySaveUser(Stream stream, List<GameInfo> gamesInfos)
        {
            var user = createdUsers.FirstOrDefault(x => x.TwitchUser != null && x.TwitchUser.ChannelId == stream.Channel.Id.ToString());
            createdUsers.Remove(user);
            createdUsers.Add(CreateFromStream(stream, gamesInfos));
        }

        public static PlayerSpotUser CreateFromStream(Stream stream, List<GameInfo> infos)
        {
            
               
            var ret = new PlayerSpotUser()
            {
                Id = "",
                TwitchUser = new TwitchTvUser()
                {
                    ChannelId = stream.Channel?.Id.ToString(),
                    ChannelName = stream.Channel?.Name
                },
                GamesInfos = infos
            };
            return ret;
        }
    }
}
