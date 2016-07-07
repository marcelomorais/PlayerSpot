using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayerSpot.LoL.ApiServices.Models.Match
{
  
 
    public class LaneInfo
    {
        public LaneEnum Lane;
        public RoleEnum Role;
        public int TeamId;
        public bool SameTeam;
        public Champion Champion;
    }
}
