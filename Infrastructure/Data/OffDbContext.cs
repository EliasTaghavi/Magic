global using Microsoft.EntityFrameworkCore;
global using System;
global using System.Collections.Generic;
global using System.Linq;
using Core.Base.Entities;
using Core.Comments.Entities;
using Core.File.Entities;
using Core.Identity.Entities;
using Core.Packs.Entities;
using Core.Purchase.Entities;
using Core.Shops.Entities;

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
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Pack> Packs { get; set; }
        public DbSet<PackBuy> PackBuys { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopOff> ShopOffs { get; set; }
        public DbSet<Buy> Buys { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public OffDbContext(DbContextOptions<OffDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.UserValidation();
            builder.RoleValidation();
            builder.TokenValidation();
            builder.CacheValidation();
            builder.CodeValidation();
            builder.PackValidation();
            builder.ShopValidation();
            builder.ShopOffValidation();
            builder.BuyValidation();
            builder.CommentValidation();
            builder.PackBuyValidation();
            builder.AppFileValidation();
            builder.SettingValidation();
            builder.UserTypeValidation();

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
                new Role { Id = "3f7566d3-7a9e-4fdb-8267-eceba8cfb024", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "کاربر", EnName = "User" },
                new Role { Id = "3843d9eb-4ada-457e-8b63-c7e69f1a9f59", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "کسب و کار", EnName = "Shop" }
            );

            modelBuilder.Entity<UserType>().HasData(
                new UserType { Id = "34e4a710-292d-4464-874a-bfcd739323e5", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "سایر", Discount = 20 },
                new UserType { Id = "bae26091-6fd0-4b43-8d68-f0610325b7d7", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "کارگر", Discount = 30 },
                new UserType { Id = "823a5500-e962-42b3-89d8-f5fb5b0270a9", CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230), Enable = true, Name = "دانشجو", Discount = 45 }
            );
        }
    }
}
