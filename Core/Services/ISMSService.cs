using System.Threading.Tasks;

namespace Core.Services
{
    public interface ISMSService
    {
        Task Verification(string Message, string Phone);
        void SendReject(string mobile, string cause);
        void SendConfirm(string mobile, string fullname);
    }
}
