﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Web.Migrations
{
    [DbContext(typeof(OffDbContext))]
    [Migration("20220107092924_AddQR")]
    partial class AddQR
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.13")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Core.File.Entities.AppFile", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<string>("FileExtension")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte>("Type")
                        .HasColumnType("tinyint");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AppFiles");
                });

            modelBuilder.Entity("Core.Identity.Entities.AccessToken", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<string>("Ip")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("JWT")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("Core.Identity.Entities.Cache", b =>
                {
                    b.Property<string>("JWT")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("JWT");

                    b.ToTable("Caches");
                });

            modelBuilder.Entity("Core.Identity.Entities.Code", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Num")
                        .HasColumnType("int");

                    b.Property<int>("Times")
                        .HasColumnType("int");

                    b.Property<byte>("Type")
                        .HasColumnType("tinyint");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique()
                        .HasFilter("[UserId] IS NOT NULL");

                    b.ToTable("Codes");
                });

            modelBuilder.Entity("Core.Identity.Entities.Role", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("EnName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = "b72799ea-f2b8-4528-9387-2f1f339dcd1c",
                            CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230),
                            EnName = "Admin",
                            Enable = true,
                            Name = "مدیر سیستم"
                        },
                        new
                        {
                            Id = "f62ebb43-e65d-493d-965a-1c0bbf94b15f",
                            CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230),
                            EnName = "God",
                            Enable = true,
                            Name = "بالای بالا"
                        },
                        new
                        {
                            Id = "815cc1c6-de17-46e7-a3e5-f73dfc818da3",
                            CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230),
                            EnName = "Support",
                            Enable = true,
                            Name = "پشتیبان"
                        },
                        new
                        {
                            Id = "3f7566d3-7a9e-4fdb-8267-eceba8cfb024",
                            CreatedDate = new DateTime(2022, 1, 2, 17, 1, 15, 300, DateTimeKind.Utc).AddTicks(2230),
                            EnName = "User",
                            Enable = true,
                            Name = "کاربر"
                        });
                });

            modelBuilder.Entity("Core.Identity.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BirthPlaceId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<string>("FatherName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("FirstLogin")
                        .HasColumnType("bit");

                    b.Property<bool>("Gender")
                        .HasColumnType("bit");

                    b.Property<DateTime>("IssuedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("IssuedPlaceId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mobile")
                        .HasMaxLength(12)
                        .HasColumnType("nvarchar(12)");

                    b.Property<bool>("MobileConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NationalId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Serial")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserStatus")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasFilter("[Email] IS NOT NULL");

                    b.HasIndex("Mobile")
                        .IsUnique()
                        .HasFilter("[Mobile] IS NOT NULL");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasFilter("[Username] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Core.Identity.Entities.UserRole", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Enable")
                        .HasColumnType("bit");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("Core.Pack.Entities.Pack", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("DayCount")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Packs");
                });

            modelBuilder.Entity("Core.Pack.Entities.PackBuy", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<string>("GatewayName")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("PackId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime?>("PayDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("PayStatus")
                        .HasColumnType("bit");

                    b.Property<long>("TrackingNumber")
                        .HasColumnType("bigint");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("PackId");

                    b.HasIndex("UserId");

                    b.HasIndex("TrackingNumber", "GatewayName")
                        .IsUnique()
                        .HasFilter("[GatewayName] IS NOT NULL");

                    b.ToTable("PackBuys");
                });

            modelBuilder.Entity("Core.QRString.Entities.QRString", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("Enable")
                        .HasColumnType("bit");

                    b.Property<string>("QR")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("QRs");
                });

            modelBuilder.Entity("Core.File.Entities.AppFile", b =>
                {
                    b.HasOne("Core.Identity.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Identity.Entities.AccessToken", b =>
                {
                    b.HasOne("Core.Identity.Entities.User", "User")
                        .WithMany("AccessTokens")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Identity.Entities.Code", b =>
                {
                    b.HasOne("Core.Identity.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Identity.Entities.UserRole", b =>
                {
                    b.HasOne("Core.Identity.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Core.Identity.Entities.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Pack.Entities.PackBuy", b =>
                {
                    b.HasOne("Core.Pack.Entities.Pack", "Pack")
                        .WithMany()
                        .HasForeignKey("PackId");

                    b.HasOne("Core.Identity.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Pack");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.QRString.Entities.QRString", b =>
                {
                    b.HasOne("Core.Identity.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Core.Identity.Entities.User", b =>
                {
                    b.Navigation("AccessTokens");

                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
