using Core.Base.Entities;
using Core.Identity.Repos;
using Core.QRString.Managers;
using Core.QRString.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.QRString.Managers
{
    public class QRStringManager : IQRStringManager
    {
        private readonly IUserRepo userRepo;
        private readonly IQRStringRepo qRStringRepo;

        public QRStringManager(IUserRepo userRepo, IQRStringRepo qRStringRepo)
        {
            this.userRepo = userRepo;
            this.qRStringRepo = qRStringRepo;
        }
        public ManagerResult<string> CreateNewQR(string userId)
        {
            qRStringRepo.DisableAllUserQR(userId);
            var qr = new Core.QRString.Entities.QRString
            {
                Enable = true,
                QR = Guid.NewGuid().ToString(),
                CreatedDate = DateTime.UtcNow,
                UserId = userId,
            };
            qr = qRStringRepo.Create(qr);
            return new ManagerResult<string>(qr.QR, true);
        }

        public ManagerResult<string> GetCurrent(string userId)
        {
            var qr = qRStringRepo.GetCurrent(userId);
            return new ManagerResult<string>(qr, true);
        }
    }
}
