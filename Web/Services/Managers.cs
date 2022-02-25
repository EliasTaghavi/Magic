using Core.Comments.Managers;
using Core.File.Managers;
using Core.Identity.Managers;
using Core.Packs.Managers;
using Core.Purchase.Managers;
using Core.Shops.Managers;
using Infrastructure.Comments.Managers;
using Infrastructure.File.Managers;
using Infrastructure.Identity.Managers;
using Infrastructure.Packs.Managers;
using Infrastructure.Purchase.Managers;
using Infrastructure.Shops.Managers;
using Microsoft.Extensions.DependencyInjection;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddManagers(this IServiceCollection services)
        {
            services.AddTransient<IUserManager, UserManager>();
            services.AddTransient<ITokenManager, TokenManager>();
            services.AddTransient<ICodeManager, CodeManager>();
            services.AddTransient<ISessionManager, SessionManager>();
            services.AddTransient<IFileManager, FileManager>();
            services.AddTransient<IPackManager, PackManager>();
            services.AddTransient<IPackBuyManager, PackBuyManager>();
            services.AddTransient<IShopManager, ShopManager>();
            services.AddTransient<IBuyManager, BuyManager>();
            services.AddTransient<ICommentManager, CommentManager>();
        }
    }
}
