using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Routing;
using Newtonsoft.Json;

namespace PlayerSpotAPI
{
    public static class WebApiConfig
    {
        private static void EnableCrossSiteRequests(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute(
                origins: "*",
                headers: "*",
                methods: "*");
            config.EnableCors(cors);
        }

        public static void Register(HttpConfiguration config)
        {
            //Habilitando Cors
            EnableCrossSiteRequests(config);

            // Web API configuration and services
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.Indent = true;
            config.Formatters.JsonFormatter.SerializerSettings = new JsonSerializerSettings{NullValueHandling = NullValueHandling.Ignore};
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApiWithAction",
                routeTemplate: "Api/{controller}/{action}");

            config.Routes.MapHttpRoute(
                name: "DefaultApiGet",
                routeTemplate: "Api/{controller}",
                defaults: new { action = "Get" },
                constraints: new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
        }
    }
}
