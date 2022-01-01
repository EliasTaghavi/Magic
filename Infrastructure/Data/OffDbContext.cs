using Core.File.Entities;
using Core.Identity.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Infrastructure.Data
{
    public class OffDbContext : DbContext
    {
        public DbSet<AppFile> AppFiles { get; set; }

        public DbSet<Cache> Caches { get; set; }

        public DbSet<Code> Codes { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<AccessToken> Tokens { get; set; }

        public DbSet<User> Users { get; set; }

        public OffDbContext(DbContextOptions<OffDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.UserValidation();
            builder.RoleValidation();
            builder.UserRoleValidation();
            builder.TokenValidation();
            builder.CacheValidation();
            builder.CodeValidation();

            builder.AppFileValidation();
            builder.Seed();
        }
    }

    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = "b72799ea-f2b8-4528-9387-2f1f339dcd1c", CreatedDate = DateTime.UtcNow, Enable = true, Name = "مدیر سیستم", EnName = "Admin" },
                new Role { Id = "f62ebb43-e65d-493d-965a-1c0bbf94b15f", CreatedDate = DateTime.UtcNow, Enable = true, Name = "بالای بالا", EnName = "God" },
                new Role { Id = "815cc1c6-de17-46e7-a3e5-f73dfc818da3", CreatedDate = DateTime.UtcNow, Enable = true, Name = "پشتیبان", EnName = "Support" },
                new Role { Id = "3f7566d3-7a9e-4fdb-8267-eceba8cfb024", CreatedDate = DateTime.UtcNow, Enable = true, Name = "کاربر", EnName = "User" }
            );
        }
    }
}
