using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace PlayerSpotAPI.Helpers
{
    public static class ResponseHelpers
    {
        public static JObject AddJsonWrapper(string[] wrapper, List<object> values)
        {
            return JObject.Parse(AddJsonWrapperToString(wrapper,values));
        }

        public static string AddJsonWrapperToString(string[] wrapper, List<object> values)
        {
            var jsonWrapped = "{ ";
            for (var i = 0; i < values.Count; i++)
            {
                jsonWrapped += string.Concat("\"",wrapper[i], "\" :");
                var jsonValue = JsonConvert.SerializeObject(values[i]);
                jsonWrapped += string.Concat(jsonValue, ",");
            }
            //TODO: Remover chaves vazias? Em javascript seria: \("([A-Z].*)": [null])\w+\g
            return string.Concat(jsonWrapped, " }");
        }

        public static JObject CustomDictonaryParse<T, U>(Dictionary<T, U> dictonary,string keyName,string valueName)
        {
            var ret = new List<object[]>();
            foreach (var u in dictonary)
            {
                var keyValue = new KeyValuePair<string, T>(keyName,u.Key);
                var valueValue = new KeyValuePair<string, U>(valueName, u.Value);
                ret.Add(new object[] { keyValue, valueValue});
            }
            return JObject.Parse(JsonConvert.SerializeObject(ret));
        }
    }
}