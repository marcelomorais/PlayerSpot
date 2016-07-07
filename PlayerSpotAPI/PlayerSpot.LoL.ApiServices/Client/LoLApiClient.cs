using RestSharp;
using RestSharp.Deserializers;
using System.Collections.Generic;
using System;
using PlayerSpot.LoL.ApiServices.Utils;
using PlayerSpot.LoL.ApiServices.Client.Interface;
using System.Configuration;
using System.Net;
using PlayerSpot.LoL.ApiServices.Models;
using PlayerSpot.LoL.ApiServices.Contracts;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace PlayerSpot.LoL.ApiServices.Client
{
    public class LoLApiClient : ILoLApiClient
    {
        protected LoLApiConnection connection { get; set; }
        public LoLApiClient(string version, bool staticData = false, bool observerConnection = false)
        {
            connection = new LoLApiConnection(version, staticData, observerConnection);
        }

        public Dictionary<string, T> GetStaticData<T>(StaticDataRequest request, string jsonPath)
        {
            var taskUrl = "/" + request.Task;
            var apiRequest = connection.Connect(taskUrl, Method.GET);
            apiRequest.AddQueryParameter("locale", request.Locale);
            apiRequest.AddQueryParameter("dataById", request.DataById.ToString());

            var response = connection.SendRequest(apiRequest);
            return GetStaticData<T>(response.Content, jsonPath);

        }
        public Dictionary<string, T> GetStaticData<T>(string content, string jsonPath)
        {
            var data = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(content);
            var path = new List<string>(jsonPath.Split('/'));
            string contentData = "";
            path.ForEach(x =>
            {
                contentData = data[x].ToString();
                data = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(contentData);
            });
            return JsonConvert.DeserializeObject<Dictionary<string, T>>(contentData);
        }

        public List<string> GetVersions()
        {
            var apiRequest = connection.Connect("versions", Method.GET);

            var response = connection.SendRequest(apiRequest);
            return JsonConvert.DeserializeObject<List<string>>(response.Content);
        }
        public Summoner GetSummoner(string name)
        {
            var apiRequest = connection.Connect("summoner/by-name/" + name, Method.GET);

            var response = connection.SendRequest(apiRequest);
            var summonerName = Regex.Replace(name, @"\s+", "").ToLower();
            var data = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(response.Content)[summonerName];
            return JsonConvert.DeserializeObject<Summoner>(data.ToString());
        }
        public Summoner GetSummoner(long id)
        {
           // if (MemoryCacher.CheckIfAlreadyExists<Summoner>("summoner_" + id))
              //  return MemoryCacher.GetValue<Summoner>("summoner_" + id);

            var apiRequest = connection.Connect("summoner/" + id, Method.GET);
            var response = connection.SendRequest(apiRequest);
            if(response.StatusCode != HttpStatusCode.OK)
                return new Summoner();
            var data = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(response.Content)[id.ToString()];
            var summoner =  JsonConvert.DeserializeObject<Summoner>(data.ToString());
            //MemoryCacher.Add("match_" + id, summoner, null);
            return summoner;
        }
        public SummonerLeague GetSummonerLeague(long id)
        {
            try
            {
                var apiRequest = connection.Connect("league/by-summoner/" + id, Method.GET);

                var response = connection.SendRequest(apiRequest);
                //TODO: A resposta eh uma lista de rankings no caso que eu testei o primeiro ja era o RANKED_5x5 mas eh melhor confirmar
                var data = JsonConvert.DeserializeObject<Dictionary<string, List<dynamic>>>(response.Content)[id.ToString()];
                string rankedData = data.Find(x => x.queue == "RANKED_SOLO_5x5").ToString();
                return JsonConvert.DeserializeObject<SummonerLeague>(rankedData);
            }
            catch(Exception exception)
            {
                return null;
            }
        }
        public CurrentMatch GetCurrentMatch(long id)
        {
           // if (MemoryCacher.CheckIfAlreadyExists<CurrentMatch>("currentMatch_" + id))
            //    return MemoryCacher.GetValue<CurrentMatch>("currentMatch_" + id);

            var apiRequest = connection.Connect("/" + id, Method.GET);
            var response = connection.SendRequest(apiRequest);
            var currentMatch = JsonConvert.DeserializeObject<CurrentMatch>(response.Content);
            //MemoryCacher.Add("currentMatch_" + id, currentMatch, null);
            return currentMatch;
        }

        public MatchHistory GetLastRankedMatches(long id, uint count = 30, long? champion = null)
        {
            var apiRequest = connection.Connect("matchlist/by-summoner/" + id, Method.GET);
            apiRequest.AddQueryParameter("rankedQueue", "TEAM_BUILDER_DRAFT_RANKED_5x5,RANKED_SOLO_5x5");
            apiRequest.AddQueryParameter("beginIndex", "0");
            apiRequest.AddQueryParameter("endIndex", count.ToString());
            if (champion.HasValue)
                apiRequest.AddQueryParameter("championIds", champion.ToString());
            var response = connection.SendRequest(apiRequest);
            return JsonConvert.DeserializeObject<MatchHistory>(response.Content); ;
        }

        public RawMatch GetRawMatch(long matchId, bool includeTimeline)
        {
            //if (!MemoryCacher.CheckIfAlreadyExists<RawMatch>("match_" + matchId))
           // {
                var apiRequest = connection.Connect("match/" + matchId, Method.GET);
                apiRequest.AddQueryParameter("includeTimeline", includeTimeline.ToString().ToLower());
                var response = connection.SendRequest(apiRequest);
                var rawMatch = JsonConvert.DeserializeObject<RawMatch>(response.Content);
               // MemoryCacher.Add("match_" + matchId, rawMatch, null);
                return rawMatch;
          //  }
           // else
           // {
            //    return MemoryCacher.GetValue<RawMatch>("match_" + matchId);
            //}
        }

        public List<RawMatch> GetRawMatches(long id, bool includeTimeline, uint count = 30, long? champion = null)
        {
            var history = GetLastRankedMatches(id, count, champion);
            var rawMatches = GetRawMatches(history, includeTimeline);
            return rawMatches;
        }

        public List<RawMatch> GetRawMatches(MatchHistory history, bool includeTimeline)
        {
            var rawMatches = new List<RawMatch>();
            foreach (var match in history.Matches)
            {
                rawMatches.Add(GetRawMatch(match.MatchId, includeTimeline));
            }
            return rawMatches;
        }
    }
}
