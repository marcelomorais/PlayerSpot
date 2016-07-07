using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Utils
{
    public class LoLApiConnection
    {
        public IRestClient RestClient { get; set; }
        public const string ApiUrl = "https://br.api.pvp.net/api/lol";
        public const string ObserverApiUrl = "https://br.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/BR1";

        public LoLApiConnection(string version, bool staticData, bool observerConnection = false)
        {
            if(observerConnection)
            {
                RestClient = new RestClient { BaseUrl = new Uri(string.Format("{0}", ObserverApiUrl)) };
            }
            else
            {
                RestClient = new RestClient { BaseUrl = new Uri(string.Format("{0}{1}/br/v{2}/", ApiUrl, (staticData ? "/static-data" : ""), version)) };
            }
        }

        public RestRequest Connect(string url, Method method)
        {
            var request = new RestRequest(url, method);
            var apiKey = APIKeyManager.GetKey();
            request.AddQueryParameter("api_key", apiKey);
            return request;
        }

        public IRestResponse SendRequest(RestRequest parameters)
        {
            return RestClient.Execute(parameters);
        }
    }
}
