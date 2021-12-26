using Core.Base.Settings;
using Core.Identity.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Threading.Tasks;
using Web.Middleware;

namespace Web.Services
{
    public static partial class ServiceExtensions
    {
        public static void AddIdentity(this IServiceCollection services, IConfiguration configuration)
        {

            IConfigurationSection jwtSection = configuration?.GetSection("JWT");

            JWTSettings jwtOptions = new JWTSettings();
            jwtSection.Bind(jwtOptions);
            services.Configure<JWTSettings>(jwtSection);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(cfg =>
                {
                    cfg.Events = new JwtBearerEvents()
                    {
                        OnAuthenticationFailed = context =>
                        {
                            context.Response.OnStarting(async () =>
                            {
                                if (context.Response.ContentType == null)
                                {
                                    context.Response.ContentType = "application/json";

                                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                                    context.Response.StatusCode = 200;
                                    await context.Response.WriteAsync("{\"code\" : \"401\"}");
                                }


                            });
                            return Task.CompletedTask;
                        },
                        OnForbidden = context =>
                        {
                            context.Response.OnStarting(async () =>
                            {
                                if (context.Response.ContentType == null)
                                {
                                    context.Response.ContentType = "application/json";

                                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                                    context.Response.StatusCode = 200;
                                    await context.Response.WriteAsync("{\"code\" : \"403\"}");
                                }

                            });
                            return Task.CompletedTask;
                        },
                        OnChallenge = context =>
                        {
                            context.Response.OnStarting(async () =>
                            {
                                if (context.Response.ContentType == null)
                                {
                                    context.Response.ContentType = "application/json";

                                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                                    context.Response.StatusCode = 200;
                                    await context.Response.WriteAsync("{\"code\" : \"401\"}");
                                }

                            });
                            return Task.CompletedTask;
                        }
                    };
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtOptions.ValidIssuer,
                        ValidAudience = jwtOptions.ValidAudience,
                        IssuerSigningKey = jwtOptions.GetIssuerSigningKey(),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddSingleton<IJwtTokenHandler, JwtTokenHandler>();
            services.AddSingleton<IPasswordHandler, PasswordHandler>();

            services.AddTransient<JwtTokenMiddleware>();
        }
    }
}
