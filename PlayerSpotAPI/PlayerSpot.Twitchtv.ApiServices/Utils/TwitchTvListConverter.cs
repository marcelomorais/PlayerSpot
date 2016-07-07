using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlayerSpot.Twitchtv.ApiServices.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.Twitchtv.ApiServices.Utils
{
    class TwitchTvListConverter : JsonConverter
    {

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            if (value == null)
            {
                serializer.Serialize(writer, null);
                return;
            }
            
            var properties = value.GetType().GetProperties();

            writer.WriteStartObject();
            object lista = new object();
            foreach (var property in properties)
            {
                if (property.Name == "List")
                    lista = property.GetValue(value, null);
                
                if (property.Name == "Alias")
                {
                    writer.WritePropertyName(property.GetValue(value, null).ToString());
                    serializer.Serialize(writer, lista);
                }
            }

            writer.WriteEndObject();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var value = Activator.CreateInstance(objectType) as TwitchTvResponse;
            var genericArg = objectType.GetGenericArguments()[0];
            var key = (JsonObjectAttribute)genericArg.GetCustomAttributes(true).FirstOrDefault();
            if (value == null || key == null)
                return null;
            var jsonObject = JObject.Load(reader);
            value.Alias = SetValue<string>(key.Id);
            var list = jsonObject[key.Id];
            var prop = value.GetType().GetProperty("List");
            if (prop != null && list != null)
            {
                prop.SetValue(value, list.ToObject(prop.PropertyType, serializer));
            }
            return value;
        }


        public override bool CanConvert(Type objectType)
        {
            return objectType.IsGenericType && typeof(TwitchTvList<>) == objectType.GetGenericTypeDefinition();
        }

        private T SetValue<T>(JToken token)
        {
            if (token != null)
            {
                return (T)token.ToObject(typeof(T));
            }
            return default(T);
        }
    }
}
