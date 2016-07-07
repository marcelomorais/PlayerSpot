using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models
{
    public interface IStaticData
    {
        long Id { get; set; }
        string Image { get; set; }
        string Name { get; set; }
        StaticImage StaticImage { get; set; }
    }
}
