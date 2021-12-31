using Core.Identity.Entities;
using Core.Identity.Enums;
using Core.Identity.Repos;
using Infrastructure.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;

namespace Web
{
    public static class DbSeeder
    {
        public static void AdminSeeder(IUserRepo userRepo, IConfiguration configuration)
        {
            bool addAdmin = bool.Parse(configuration["Identity:AddAdmin"]);
            if (!addAdmin)
            {
                return;
            }
            if (userRepo.Bucket().Any(u => u.Username == "admin"))
            {
                return;
            }
            PasswordHandler handler = new();
            PasswordHashResult pass = handler.CreatePasswordHash("3040184571");
            User user = new()
            {
                Id = "5d144282-ae61-4472-9d90-daa945db4cd2",
                Enable = true,
                CreatedDate = DateTime.UtcNow,
                //---------------------------------------------------------
                Code = "3040184571",
                NationalId = "3040184571",
                Serial = "56 الف 195600",
                Gender = true,
                Name = "الیاس",
                Surname = "تقوی رشیدی زاده",
                Birthday = new DateTime(1992, 05, 08, 0, 0, 0, DateTimeKind.Utc),
                BirthPlaceId = "f7cd5e7d-be83-41d9-b82f-a81f43073b7c",
                FatherName = "علیرضا",
                IssuedDate = new DateTime(1992, 05, 08, 0, 0, 0, DateTimeKind.Utc),
                IssuedPlaceId = "8eef2bc7-e87d-4bca-ab23-388efdb644c1",
                FirstLogin = true,
                Mobile = "09304359576",
                MobileConfirmed = true,
                Email = "elias.taghavi.rz@outlook.com",
                EmailConfirmed = true,
                Address = "رفسنجان بلوار امام رضا کوچه شماره 2 پلاک 35",
                UserStatus = UserStatus.Confirmed,
                //---------------------------------------------------------
                Username = "admin",
                PasswordHash = pass.PasswordHash,
                PasswordSalt = pass.PasswordSalt,
            };
            user.UserRoles.Add(new UserRole { RoleId = "f62ebb43-e65d-493d-965a-1c0bbf94b15f", CreatedDate = DateTime.UtcNow, Enable = true });
            user.UserRoles.Add(new UserRole { RoleId = "b72799ea-f2b8-4528-9387-2f1f339dcd1c", CreatedDate = DateTime.UtcNow, Enable = true });
            userRepo.Create(user);
        }
    }
}
