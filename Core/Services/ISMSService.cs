using System.Threading.Tasks;

namespace Core.Services
{
    public interface ISMSService
    {
        Task Verification(string Message, string Phone);
        void SendReject(string mobile, string message);
        void SendConfirm(string mobile, string fullname);
    }
}
