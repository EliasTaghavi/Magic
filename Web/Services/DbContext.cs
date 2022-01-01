using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            string connection = configuration.GetConnectionString("App");


            services.AddDbContext<OffDbContext>(options => options.UseSqlServer(connection, o =>
            {
                o.MigrationsAssembly("Web");
                o.UseNetTopologySuite();
            }));
        }
    }
}
