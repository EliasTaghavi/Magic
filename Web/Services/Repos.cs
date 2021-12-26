using Core.File.Repos;
using Core.Identity.Repos;
using Infrastructure.File.Repos;
using Infrastructure.Identity.Repos;
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
        }
    }
}
