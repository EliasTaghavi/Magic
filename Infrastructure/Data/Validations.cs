﻿using Core.File.Entities;
using Core.Identity.Entities;
using Microsoft.EntityFrameworkCore;

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
                user.HasIndex(x => x.Phone)
                    .IsUnique();
                user.Property(x => x.Phone)
                    .HasMaxLength(12);
                user.Ignore(x => x.ObjectState);
            });
        }

        public static void UserRoleValidation(this ModelBuilder builder)
        {
            builder?.Entity<UserRole>()
                    .HasKey(ur => new { ur.UserId, ur.RoleId });
        }
    }
}
