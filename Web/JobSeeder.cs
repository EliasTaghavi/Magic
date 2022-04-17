using Hangfire;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Web
{
    public class JobSeeder
    {
        public IServiceProvider Services { get; }

        public JobSeeder(IServiceProvider services)
        {
            Services = services;
        }
        public void AddStudentJob()
        {
            if (OperatingSystem.IsWindows())
            {
                RecurringJob.AddOrUpdate("FindNotConfirmedStudent", () => FindNotConfirmedStudent(), Cron.Daily(11,20), timeZone: TimeZoneInfo.FindSystemTimeZoneById("Iran Standard Time"));
            }
            if (OperatingSystem.IsLinux())
            {
                RecurringJob.AddOrUpdate("FindNotConfirmedStudent", () => FindNotConfirmedStudent(), Cron.Daily(11, 20), timeZone: TimeZoneInfo.FindSystemTimeZoneById("Asia/Tehran"));
            }
        }

        public void FindNotConfirmedStudent()
        {
            using IServiceScope scope = Services.CreateScope();
            OffDbContext context = scope.ServiceProvider.GetRequiredService<OffDbContext>();
            var phoneConfirmedUser = context.Users
                .Where(x => x.UserStatus == Core.Identity.Enums.UserStatus.PhoneConfirmed)
                .Select(x => x.Id);
            var buyers = context.PackBuys.Where(x => x.PayStatus ?? false && phoneConfirmedUser.Contains(x.UserId)).Include(x => x.User).Include(x => x.Pack).ToList();
            foreach (var item in buyers)
            {
                if (item.PayDate.Value.AddDays(3) <= DateTime.UtcNow)
                {
                    item.RealExpireDate = item.PayDate.Value.AddDays(Math.Floor((double)item.Pack.DayCount / 2));
                    
                }

            }
            context.SaveChanges();
        }
    }
}
