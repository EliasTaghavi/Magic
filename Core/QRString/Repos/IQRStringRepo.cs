using Core.Base.Repos;

namespace Core.QRString.Repos
{
    public interface IQRStringRepo : IRepo<Entities.QRString>
    {
        void DisableAllUserQR(string userId);
        string GetCurrent(string userId);
        Entities.QRString ReadByQR(string userId);
    }
}
