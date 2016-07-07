using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Utils
{
    public static class APIKeyManager
    {
        //Sharkaum, iPed,EncontreSeuEixo, Shizue
        private static List<string> _keys = new List<string>{ "4fd414ff-3ca7-44d3-b81c-3ca2debe134f", "d5da8664-9d6b-479a-80a3-836eb9359e30", "67a9cf7a-a0b5-46e5-8a1a-b169605f3c37", "9fd77296-cf3e-4552-adca-82ec1903e0f3" };
        private static int i = 0;

        public static string GetKey()
        {
            var key = _keys[i];
            UpdateKey();
            return key;
        }

        public static void AddKey(string key)
        {
            if (_keys.Contains(key))
                return;
            _keys.Add(key);
        }

        private static void UpdateKey()
        {
            i++;
            if (i >= _keys.Count)
                i = 0;
        }
    }
}
