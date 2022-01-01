using Core.File.Managers;
using Core.Identity.Managers;
using Infrastructure.File.Managers;
using Infrastructure.Identity.Managers;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddManagers(this IServiceCollection services)
        {
            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<ITokenManager, TokenManager>();
            services.AddTransient<ISessionManager, SessionManager>();
            services.AddTransient<IFileManager, FileManager>();
        }
    }
}
