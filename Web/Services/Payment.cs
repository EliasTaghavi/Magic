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
            services.AddParbad()
                .ConfigureGateways(gateways =>
                {
                    gateways
                        .AddZarinPal()
                        .WithAccounts(accounts =>
                        {
                            accounts.AddInMemory(account =>
                            {
                                account.Name = "ZarinPal"; // optional if there is only 1 account for this gateway
                                account.MerchantId = "";
                                account.IsSandbox = true;
                            });
                        });

                    gateways
                        .AddParbadVirtual()
                        .WithOptions(options => options.GatewayPath = "/MyVirtualGateway");
                })
                .ConfigureHttpContext(builder => builder.UseDefaultAspNetCore())
                .ConfigureStorage(builder => builder.UseEfCore(options =>
                {
                    string connection = configuration.GetConnectionString("App");
                    var migrationsAssemblyName = typeof(Startup).Assembly.GetName().Name; // An Assembly where your migrations files are in it. In this sample the files are in the same project.

                    options.ConfigureDbContext = db => db.UseSqlServer(connection, sql =>
                    {
                        sql.MigrationsAssembly(migrationsAssemblyName);
                    });
                }));
        }

    }
}
