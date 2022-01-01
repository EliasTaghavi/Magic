using Core.Base.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<SMSSettings>(configuration?.GetSection("SMS"));
            services.Configure<FileSettings>(configuration?.GetSection("File"));
        }
    }
}
