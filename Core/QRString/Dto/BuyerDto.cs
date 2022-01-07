using Core.Identity.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QRString.Dto
{
    public class BuyerDto
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public UserType UserType { get; set; }
        public bool PackStatus { get; set; }
        public int DayRemain { get; set; }
        public DateTime ExpireDate { get; set; }
        public string SelfieUrl { get; set; }
    }
}
