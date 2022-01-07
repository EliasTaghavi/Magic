using Core.Base.Repos;
using Core.QRString.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.QRString.Repos
{
    public interface IQRStringRepo : IRepo<Entities.QRString>
    {
        void DisableAllUserQR(string userId);
        string GetCurrent(string userId);
        Entities.QRString ReadByQR(string userId);
    }
}
