using System.Threading.Tasks;

namespace Core.Services
{
    public interface ISMSService
    {
        Task Verification(string Message, string Phone);
    }
}
