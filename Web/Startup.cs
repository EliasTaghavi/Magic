using Core.Base.Entities;
using Hangfire;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Serilog;
using System.Globalization;
using System.IO;
using Web.Middleware;
using Web.Services;

namespace Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, OffDbContext dbContext)
        {
            DbSeeder.AdminSeeder(dbContext, Configuration);

            var cultureInfo = new CultureInfo("fa-IR");
            var uiCultureInfo = new CultureInfo("en-US");

            CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
            CultureInfo.DefaultThreadCurrentUICulture = uiCultureInfo;

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor
                                   | ForwardedHeaders.XForwardedProto
            });

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            //file
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
            Path.Combine(env.ContentRootPath, "ids")),
                RequestPath = "/ids"
            });
            app.UseSpaStaticFiles();
            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                
            });
            app.UseSerilogRequestLogging();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<JwtTokenMiddleware>();
            app.UseCors(
                options => options.AllowAnyOrigin()
                                  .AllowAnyHeader()
                                  .AllowAnyMethod()
                );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
            JobSeeder jobSeeder = new(app.ApplicationServices);
            jobSeeder.AddStudentJob();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext(Configuration);
            services.AddIdentity(Configuration);
            services.AddRepos();
            services.AddManagers();
            services.AddServices();
            services.AddSettings(Configuration);
            services.AddCors();
            services.AddSwaggerGen();
            services.AddPayment(Configuration);
            services.AddBackJobs(Configuration);

            services.AddControllersWithViews().AddNewtonsoftJson(op => op.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.Configure<ApiBehaviorOptions>(op =>
            {
                op.InvalidModelStateResponseFactory = actionContext =>
                {
                    return new OkObjectResult(new ManagerResult<bool>
                    {
                        Code = 9,
                        Errors = actionContext.ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage).ToList(),
                        Message = "InputsAreNotValid.",
                        Success = false
                    });
                };
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }
    }
}
