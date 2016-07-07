using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using PlayerSpot.LoL.ApiServices;
using PlayerSpot.LoL.ApiServices.Client.Interface;
using PlayerSpot.LoL.ApiServices.Client;
using PlayerSpot.LoL.ApiServices.Contracts;
using PlayerSpot.LoL.ApiServices.Models;
using System.Reflection;
using System.Globalization;

namespace PlayerSpot.DataLoader
{
    class Program
    {
        private static string apiVersion;
        private static string rawPath;
        private static ILoLApiClient _apiClient;

        static void Main(string[] args)
        {
            apiVersion = args[0];
            rawPath = args[1];
            _apiClient = new LoLApiClient(apiVersion, true);
            var tasks = args.Length > 2 ? args.ToList().GetRange(2, args.Length - 2) :
                new List<string>() { "champion", "item", "rune", "summoner-spell", "mastery" };
            tasks.ForEach(GetData);
            Console.ReadLine();
        }

        static void GetData(string taskName)
        {
            Console.WriteLine("Buscando " + taskName);
            var request = new StaticDataRequest()
            {
                DataById = true,
                Locale = "pt_BR",
                Task = taskName
            };
            switch (taskName)
            {
                case "champion":
                    ProcessRequest<Champion>(request, taskName);
                    break;
                case "rune":
                    ProcessRequest<Rune>(request, taskName);
                    break;
                case "mastery":
                    ProcessRequest<Mastery>(request, taskName);
                    break;
                case "summoner-spell":
                    ProcessRequest<SummonerSpell>(request, taskName);
                    break;
                case "item":
                    ProcessRequest<Item>(request, taskName);
                    break;

            }
        }

        static void ProcessRequest<T>(StaticDataRequest request, string taskName)
        {
            var jsonPath = "data";
            var dataDict = _apiClient.GetStaticData<T>(request, jsonPath);
            var apiVersion = _apiClient.GetVersions()[0];

            foreach (IStaticData data in dataDict.Values)
            {
                GetImages(apiVersion, taskName, data);
                Console.WriteLine("Buscando imagem " + data.Name);
            }

            Console.WriteLine("Terminando busca");

            var championsJSON = JsonConvert.SerializeObject(dataDict);
            SaveFile(championsJSON, taskName);
        }

        static void GetImages(string apiVersion, string taskName, IStaticData data)
        {
            var imageName = data.Id.ToString();
            if (taskName == "summoner-spell")
            {
                imageName = ((dynamic)data).Key;
                taskName = "spell";
            }

            if (taskName == "champion")
                taskName = data.Name;

            var image = string.Format("{0}{1}/{2}/{3}/{4}.png", "http://ddragon.leagueoflegends.com/cdn/", apiVersion, "img",
                taskName, imageName);
            data.Image = image;
        }

        static void SaveFile(string json, string taskName)
        {
            var filePath = string.Format("{0}{1}.json", rawPath, taskName);
            File.WriteAllText(filePath, json);
            Console.WriteLine("Arquivo salvo: " + filePath);
        }
    }
}
