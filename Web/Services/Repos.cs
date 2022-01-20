using Core.Base.Repos;
using Core.File.Repos;
using Core.Identity.Repos;
using Core.Packs.Repos;
using Core.Purchase.Repos;
using Core.Shops.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.File.Repos;
using Infrastructure.Identity.Repos;
using Infrastructure.Packs.Repos;
using Infrastructure.Purchase.Repos;
using Infrastructure.Shops.Repos;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddRepos(this IServiceCollection services)
        {
            services.AddTransient<IRoleRepo, RoleRepo>();
            services.AddTransient<ITokenRepo, TokenRepo>();
            services.AddTransient<IUserRepo, UserRepo>();
            services.AddTransient<IUserTypeRepo, UserTypeRepo>();
            services.AddTransient<ICodeRepo, CodeRepo>();
            services.AddTransient<ICacheRepo, CacheRepo>();
            services.AddTransient<IAppFileRepo, AppFileRepo>();
            services.AddTransient<IPackRepo, PackRepo>();
            services.AddTransient<IPackBuyRepo, PackBuyRepo>();
            services.AddTransient<IShopRepo, ShopRepo>();
            services.AddTransient<IShopOffRepo, ShopOffRepo>();
            services.AddTransient<IBuyRepo, BuyRepo>();
            services.AddTransient<ISettingRepo, SettingRepo>();
        }
    }
}
