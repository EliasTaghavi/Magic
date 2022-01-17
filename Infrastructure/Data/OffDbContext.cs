using Core.Base.Entities;
using Core.File.Entities;
using Core.Identity.Entities;
using Core.Pack.Entities;
using Core.Shop.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Infrastructure.Data
{
    public class OffDbContext : DbContext
    {
        public DbSet<Setting> Settings { get; set; }
        public DbSet<AppFile> AppFiles { get; set; }
        public DbSet<Cache> Caches { get; set; }
        public DbSet<Code> Codes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<AccessToken> Tokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Core.Pack.Entities.Pack> Packs { get; set; }
        public DbSet<PackBuy> PackBuys { get; set; }
        public DbSet<Core.QRString.Entities.QRString> QRs { get; set; }
        public DbSet<Core.Shop.Entities.Shop> Shops { get; set; }
        public DbSet<ShopOff> shopOffs { get; set; }

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
            builder.PackValidation();
            builder.ShopValidation();
            builder.ShopOffValidation();
            builder.PackBuyValidation();
            builder.QRValidation();
            builder.AppFileValidation();
            builder.SettingValidation();
            builder.Seed();
        }
    }

    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = "b72799ea-f2b8-4528-9387-2f1f339dcd1c", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "مدیر سیستم", EnName = "Admin" },
                new Role { Id = "f62ebb43-e65d-493d-965a-1c0bbf94b15f", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "بالای بالا", EnName = "God" },
                new Role { Id = "815cc1c6-de17-46e7-a3e5-f73dfc818da3", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "پشتیبان", EnName = "Support" },
                new Role { Id = "3f7566d3-7a9e-4fdb-8267-eceba8cfb024", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "کاربر", EnName = "User" }
            );
        }
    }
}
