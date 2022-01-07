using Core.Base.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QRString.Managers
{
    public interface IQRStringManager
    {
        ManagerResult<string> CreateNewQR(string userId);
        ManagerResult<string> GetCurrent(string userId);
    }
}
