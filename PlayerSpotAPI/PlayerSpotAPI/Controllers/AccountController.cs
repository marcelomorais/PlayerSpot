using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace PlayerSpotAPI.Controllers
{
    public class AccountController : ApiController
    {
        public string clientId = "49dcfsuds2dzk3pld5obf4f2ylzka3n";
        public string secretToken = "a7xqi52rwzcl4bfqgzpycarr5lsrg49";
        public string redirectUrl = "http://localhost:41773/API/Account/ExternalLogin";
        
        [HttpGet]
        public JObject ExternalLogin(string code = "", string scope = "")
        {
            var client = new RestClient("https://api.twitch.tv/kraken/oauth2/");
            var req = new RestRequest("token?", Method.POST);
            req.AddHeader("Content-Type", "application/vnd.twitchtv.v3+json");
            req.AddParameter("client_id", clientId);
            req.AddParameter("grant_type", "authorization_code");
            req.AddParameter("client_secret",secretToken);
            req.AddParameter("code", code);
            req.AddParameter("redirect_uri", redirectUrl);
            var result = client.Execute(req);
            return JObject.Parse(result.Content);
        }
    }
}