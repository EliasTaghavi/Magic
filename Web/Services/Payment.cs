using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Parbad.Builder;
using Parbad.Gateway.ParbadVirtual;
using Parbad.Gateway.ZarinPal;
using Parbad.Storage.EntityFrameworkCore.Builder;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddPayment(this IServiceCollection services, IConfiguration configuration)
        {
            var devEnv = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
            services.AddParbad()
                .ConfigureGateways(gateways =>
                {
                    gateways
                        .AddZarinPal()
                        .WithAccounts(accounts =>
                        {
                            accounts.AddInMemory(account =>
                            {
                                account.MerchantId = "cdf6b9b5-97b4-488b-ab35-44b0bdd79bbd";
                                account.IsSandbox = true;
                            });
                        });
                })
                .ConfigureHttpContext(builder => builder.UseDefaultAspNetCore())
                .ConfigureStorage(builder => builder.UseEfCore(options =>
                {
                    string connection = configuration.GetConnectionString("App");
                    options.ConfigureDbContext = db => db.UseSqlServer(connection, sql =>
                    {
                        sql.MigrationsAssembly("Infrastructure");
                    });
                }));
        }

    }
}
