using Core.Base.Repos;
using Core.File.Repos;
using Core.Identity.Repos;
using Core.Pack.Repos;
using Core.QRString.Repos;
using Core.Shop.Repos;
using Infrastructure.Base.Repos;
using Infrastructure.File.Repos;
using Infrastructure.Identity.Repos;
using Infrastructure.Pack.Repos;
using Infrastructure.QRString.Repos;
using Infrastructure.Shop.Repos;
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
            services.AddTransient<ICodeRepo, CodeRepo>();
            services.AddTransient<ICacheRepo, CacheRepo>();
            services.AddTransient<IAppFileRepo, AppFileRepo>();
            services.AddTransient<IPackRepo, PackRepo>();
            services.AddTransient<IPackBuyRepo, PackBuyRepo>();
            services.AddTransient<IQRStringRepo, QRStringRepo>();
            services.AddTransient<IShopRepo, ShopRepo>();
            services.AddTransient<IShopOffRepo, ShopOffRepo>();
            services.AddTransient<ISettingRepo, SettingRepo>();
        }
    }
}
