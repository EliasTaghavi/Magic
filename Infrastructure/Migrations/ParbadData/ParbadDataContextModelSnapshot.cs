﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Parbad.Storage.EntityFrameworkCore.Context;

#nullable disable

namespace Infrastructure.Migrations.ParbadData
{
    [DbContext(typeof(ParbadDataContext))]
    partial class ParbadDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Parbad.Storage.EntityFrameworkCore.Domain.PaymentEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("payment_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("amount");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_on");

                    b.Property<string>("GatewayAccountName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("gateway_account_name");

                    b.Property<string>("GatewayName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("gateway_name");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("bit")
                        .HasColumnName("is_completed");

                    b.Property<bool>("IsPaid")
                        .HasColumnType("bit")
                        .HasColumnName("is_paid");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("token");

                    b.Property<long>("TrackingNumber")
                        .HasColumnType("bigint")
                        .HasColumnName("tracking_number");

                    b.Property<string>("TransactionCode")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("transaction_code");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_on");

                    b.HasKey("Id")
                        .HasName("payment_id");

                    b.HasIndex("Token")
                        .IsUnique();

                    b.HasIndex("TrackingNumber")
                        .IsUnique();

                    b.ToTable("payment", "parbad");
                });

            modelBuilder.Entity("Parbad.Storage.EntityFrameworkCore.Domain.TransactionEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("transaction_id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("AdditionalData")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("additional_data");

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("amount");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_on");

                    b.Property<bool>("IsSucceed")
                        .HasColumnType("bit")
                        .HasColumnName("is_succeed");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("message");

                    b.Property<long>("PaymentId")
                        .HasColumnType("bigint");

                    b.Property<byte>("Type")
                        .HasColumnType("tinyint")
                        .HasColumnName("type");

                    b.Property<DateTime?>("UpdatedOn")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_on");

                    b.HasKey("Id")
                        .HasName("transaction_id");

                    b.HasIndex("PaymentId");

                    b.ToTable("transaction", "parbad");
                });

            modelBuilder.Entity("Parbad.Storage.EntityFrameworkCore.Domain.TransactionEntity", b =>
                {
                    b.HasOne("Parbad.Storage.EntityFrameworkCore.Domain.PaymentEntity", "Payment")
                        .WithMany("Transactions")
                        .HasForeignKey("PaymentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Payment");
                });

            modelBuilder.Entity("Parbad.Storage.EntityFrameworkCore.Domain.PaymentEntity", b =>
                {
                    b.Navigation("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}
