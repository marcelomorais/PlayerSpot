using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Contracts
{
    public class StaticDataRequest
    {
        public string Task { get; set; }
        public string Locale { get; set; }
        public bool DataById { get; set; }

    }
}
