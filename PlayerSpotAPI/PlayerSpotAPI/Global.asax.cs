using Newtonsoft.Json;
using PlayerSpot.LoL.ApiServices.Models;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace PlayerSpotAPI
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            LoadStaticData();
            //LoadStreamersData();
        }

        public void LoadStaticData()
        {
            var staticDataPath = HostingEnvironment.MapPath(ConfigurationManager.AppSettings["staticDataFolder"]);
             var files = new List<string>(Directory.GetFiles(staticDataPath, "*.json"));
            files.ForEach(filePath =>
            {
                var fileKey = Path.GetFileNameWithoutExtension(filePath);
                //TODO: usar reflection para resumir codigo?
                switch (fileKey)
                {
                    case "champion":
                        var champions = JsonConvert.DeserializeObject<Dictionary<string, Champion>>(File.ReadAllText(filePath));
                        foreach(var champion in champions)
                        {
                            MemoryCacher.Add("champion_" + champion.Value.Id, champion.Value, null);
                        }
                        return;
                    case "summoner":
                        var spells = JsonConvert.DeserializeObject<Dictionary<string, SummonerSpell>>(File.ReadAllText(filePath));
                        foreach (var spell in spells)
                        {
                            MemoryCacher.Add("spell_" + spell.Value.Id, spell.Value, null);
                        }
                        return;
                    case "item":
                        var items = JsonConvert.DeserializeObject<Dictionary<string, Item>>(File.ReadAllText(filePath));
                        foreach (var item in items)
                        {
                            MemoryCacher.Add("item_" + item.Value.Id, item.Value, null);
                        }
                        return;
                    case "rune":
                        var runes = JsonConvert.DeserializeObject<Dictionary<string, Rune>>(File.ReadAllText(filePath));
                        foreach (var rune in runes)
                        {
                            rune.Value.Id = long.Parse(rune.Key);
                            MemoryCacher.Add("rune_" + rune.Value.Id, rune.Value, null);
                        }
                        return;
                    case "mastery":
                        var masteries = JsonConvert.DeserializeObject<Dictionary<string, Mastery>>(File.ReadAllText(filePath));
                        foreach (var mastery in masteries)
                        {
                            MemoryCacher.Add("mastery_" + mastery.Value.Id, mastery.Value, null);
                        }
                        return;
                    case "profileicon":
                        var profileIcons = JsonConvert.DeserializeObject<Dictionary<string, ProfileIcon>>(File.ReadAllText(filePath));
                        foreach (var profileIcon in profileIcons)
                        {
                            MemoryCacher.Add("profileIcon_" + profileIcon.Value.Id, profileIcon.Value, null);
                        }
                        return;
                }
            });
        }

        public void LoadStreamersData()
        {
            MemoryCacher.Add("streamer_" + "mixrj".ToLower(), "Nidalee Cansada", null);
            MemoryCacher.Add("streamer_" + "daniels".ToLower(), "Safadaniels", null);
            MemoryCacher.Add("streamer_" + "Sonecaaaa".ToLower(), "Soneca viado", null);
            MemoryCacher.Add("streamer_" + "jovironebr".ToLower(), "Im NiceZz", null);
            MemoryCacher.Add("streamer_" + "gratis150ml".ToLower(), "gratis 150ml", null);
            MemoryCacher.Add("streamer_" + "s2AlineFaria".ToLower(), "ahríne", null);
            MemoryCacher.Add("streamer_" + "hastad".ToLower(), "vayne is my main", null);
        }
    }
}
