using Core.Services;
using Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<ISMSService, SMSService>();
        }
    }
}
