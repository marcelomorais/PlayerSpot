using Newtonsoft.Json;
using PlayerSpot.LoL.ApiServices.Client;
using PlayerSpot.LoL.ApiServices.Client.Interface;
using PlayerSpot.LoL.ApiServices.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace PlayerSpot.DataLoader2
{
    class Program
    {
        private static string DDRAGON_URL = "http://ddragon.leagueoflegends.com/cdn/";
        private static List<string> dataList;
        public static string version;
        private static ILoLApiClient _apiClient;
        private static string rawPath;

        static void Main(string[] args)
        {
            rawPath = args[0];
            version = ConfigurationManager.AppSettings["lolStaticDataVersion"];
            var language = ConfigurationManager.AppSettings["language"];
            DDRAGON_URL = string.Format("{0}{1}/data/{2}/", DDRAGON_URL, version, language);
            dataList = new List<string>()
            {
                "profileicon",
                "champion",
                "item",
                "mastery",
                "rune",
                "summoner"
            };
            _apiClient = new LoLApiClient(version, true);
            dataList.ForEach(ProcessData);
            Console.ReadLine();
        }

        private static void ProcessData(string data)
        {
            Console.WriteLine("Buscando " + data);
            var url = DDRAGON_URL + data + ".json";
            var request = WebRequest.Create(url);
            var responseStream = request.GetResponse().GetResponseStream();
            var streamReader = new StreamReader(responseStream);
            var content = streamReader.ReadToEnd();
            switch (data)
            {
                case "profileicon":
                    ProcessRequest<ProfileIcon>(content, data);
                    break;
                case "champion":
                    ProcessRequest<Champion>(content, data);
                    break;
                case "rune":
                    ProcessRequest<Rune>(content, data);
                    break;
                case "mastery":
                    ProcessRequest<Mastery>(content, data);
                    break;
                case "summoner":
                    ProcessRequest<SummonerSpell>(content, data);
                    break;
                case "item":
                    ProcessRequest<Item>(content, data);
                    break;

            }
        }

        private static void ProcessRequest<T>(string content, string taskName)
        {
            var dataDict = _apiClient.GetStaticData<T>(content, "data");
            foreach (IStaticData data in dataDict.Values)
            {
                GetImages(version, taskName, data);
                Console.WriteLine("Buscando imagem " + data.Name);
            }

            Console.WriteLine("Terminando busca");

            var championsJSON = JsonConvert.SerializeObject(dataDict);
            SaveFile(championsJSON, taskName);
        }

        static void GetImages(string apiVersion, string taskName, IStaticData data)
        {
            var imageName = data.StaticImage.Image;
            if (taskName == "summoner")
                taskName = "spell";

            var image = string.Format("{0}{1}/{2}/{3}/{4}", "http://ddragon.leagueoflegends.com/cdn/", apiVersion, "img",
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
