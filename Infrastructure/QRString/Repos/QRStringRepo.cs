using Core.QRString.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.QRString.Repos
{
    public class QRStringRepo : Repo<Core.QRString.Entities.QRString>, IQRStringRepo
    {
        public QRStringRepo(OffDbContext offDbContext) : base(offDbContext)
        {

        }

        public void DisableAllUserQR(string userId)
        {
            var enableQRs = GetSet().Where(x => x.UserId == userId && x.Enable.Value == true).Select(x => x.Id).ToList();
            foreach (var enableQR in enableQRs)
            {
                Disable(enableQR);
            }
        }

        public string GetCurrent(string userId)
        {
            var enableQRs = GetSet().Where(x => x.UserId == userId && x.Enable.Value == true).Select(x => x.Id).FirstOrDefault();
            return enableQRs;
        }
    }
}
