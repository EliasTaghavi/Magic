using Core.Base.Entities;
using Core.File.Entities;
using Core.Identity.Entities;
using Core.Purchase.Entities;

namespace Infrastructure.Data
{
    public static class Validations
    {
        public static void AppFileValidation(this ModelBuilder builder)
        {
            builder?.Entity<AppFile>(file =>
            {
                file.HasKey(x => x.Id);
                file.Ignore(x => x.FullName);
                file.Ignore(x => x.ObjectState);
                file.HasOne(x => x.User).WithOne().OnDelete(DeleteBehavior.Cascade);
            });
        }

        public static void SettingValidation(this ModelBuilder builder)
        {
            builder?.Entity<Setting>(setting =>
            {
                setting.Property(x => x.Id).ValueGeneratedOnAdd();
                setting.HasKey(x => x.Id);
                setting.Ignore(x => x.ObjectState);
            });
        }

        public static void UserTypeValidation(this ModelBuilder builder)
        {
            builder?.Entity<UserType>(yserType =>
            {
                yserType.Property(x => x.Id).ValueGeneratedOnAdd();
                yserType.HasKey(x => x.Id);
                yserType.Ignore(x => x.ObjectState);
            });
        }

        public static void TokenValidation(this ModelBuilder builder)
        {
            builder?.Entity<AccessToken>(token =>
            {
                token.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                token.HasKey(x => x.Id);
                token.Ignore(x => x.ObjectState);
            });
        }

        public static void CacheValidation(this ModelBuilder builder)
        {
            builder?.Entity<Cache>(cache =>
            {
                cache.Property(x => x.JWT).IsRequired();
                cache.HasKey(x => x.JWT);
            });
        }

        public static void CodeValidation(this ModelBuilder builder)
        {
            builder.Entity<Code>(token =>
            {
                token.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                token.HasKey(x => x.Id);
                token.HasIndex(x => x.UserId)
                     .IsUnique();
            });
        }

        public static void PackValidation(this ModelBuilder builder)
        {
            builder.Entity<Core.Packs.Entities.Pack>(pack =>
            {
                pack.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                pack.HasKey(x => x.Id);
                pack.Ignore(x => x.ObjectState);
                pack.Property(i => i.Price)
                .HasColumnType("money");
            });
        }

        public static void ShopValidation(this ModelBuilder builder)
        {
            builder.Entity<Core.Shops.Entities.Shop>(shop =>
            {
                shop.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                shop.HasKey(x => x.Id);
                shop.Ignore(x => x.ObjectState);
                shop.HasIndex(x => x.ReferralCode)
                .IsUnique();
                shop.HasMany(x => x.Offs).WithOne(x => x.Shop).OnDelete(DeleteBehavior.Cascade);
            });
        }

        public static void ShopOffValidation(this ModelBuilder builder)
        {
            builder.Entity<Core.Shops.Entities.ShopOff>(shopOff =>
            {
                shopOff.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                shopOff.HasKey(x => x.Id);
                shopOff.Ignore(x => x.ObjectState);
                shopOff.HasOne(e => e.Shop)
        .WithMany(e => e.Offs)
        .OnDelete(DeleteBehavior.Cascade);
            });
        }

        public static void BuyValidation(this ModelBuilder builder)
        {
            builder.Entity<Buy>(buy =>
            {
                buy.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                buy.HasKey(x => x.Id);
                buy.Ignore(x => x.ObjectState);
                buy.Property(i => i.FullPrice)
                .HasColumnType("money");
                buy.Property(i => i.AfterDiscount)
                .HasColumnType("money");
            });
        }

        public static void PackBuyValidation(this ModelBuilder builder)
        {
            builder.Entity<Core.Packs.Entities.PackBuy>(packBuy =>
            {
                packBuy.Property(x => x.Id)
                     .ValueGeneratedOnAdd();
                packBuy.HasKey(x => x.Id);
                packBuy.HasIndex(x => new { x.TrackingNumber, x.GatewayName }).IsUnique();
                packBuy.Ignore(x => x.ObjectState);
            });
        }

        public static void RoleValidation(this ModelBuilder builder)
        {
            builder?.Entity<Role>(role =>
            {
                role.Property(x => x.Id)
                    .ValueGeneratedOnAdd();
                role.HasKey(x => x.Id);
                role.HasIndex(x => x.Name)
                    .IsUnique();
                role.Ignore(x => x.ObjectState);
                role.HasMany(x => x.Users).WithMany(x => x.Roles);
            });
        }

        public static void UserValidation(this ModelBuilder builder)
        {
            builder?.Entity<User>(user =>
            {
                user.Property(x => x.Id)
                    .ValueGeneratedOnAdd();
                user.HasKey(x => x.Id);
                user.HasIndex(x => x.Username)
                    .IsUnique();
                user.HasIndex(x => x.Email)
                    .IsUnique();
                user.HasIndex(x => x.Mobile)
                    .IsUnique();
                user.Property(x => x.Mobile)
                    .HasMaxLength(12);
                user.Ignore(x => x.ObjectState);
                user.HasMany(x => x.Roles).WithMany(x => x.Users);
                user.HasMany(x => x.AccessTokens).WithOne(x => x.User).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
