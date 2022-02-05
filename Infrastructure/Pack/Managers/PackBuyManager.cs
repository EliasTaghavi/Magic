using Core;
using Core.Base.Dto;
using Core.Base.Entities;
using Core.Base.Repos;
using Core.Identity.Repos;
using Core.Packs.Dto;
using Core.Packs.Entities;
using Core.Packs.Managers;
using Core.Packs.Repos;
using Core.Shops.Dto;
using Core.Shops.Repos;
using Parbad;
using Parbad.Gateway.ZarinPal;
using System.Globalization;

namespace Infrastructure.Packs.Managers
{
    public class PackBuyManager : IPackBuyManager
    {
        private readonly ISettingRepo settingRepo;
        private readonly IShopRepo shopRepo;
        private readonly IPackBuyRepo packBuyRepo;
        private readonly IPackRepo packRepo;
        private readonly IUserRepo userRepo;
        private readonly IOnlinePayment onlinePayment;

        public PackBuyManager(ISettingRepo settingRepo, IShopRepo shopRepo, IPackBuyRepo packBuyRepo, IPackRepo packRepo, IUserRepo userRepo, IOnlinePayment onlinePayment)
        {
            this.settingRepo = settingRepo;
            this.shopRepo = shopRepo;
            this.packBuyRepo = packBuyRepo;
            this.packRepo = packRepo;
            this.userRepo = userRepo;
            this.onlinePayment = onlinePayment;
        }

        public ManagerResult<IPaymentRequestResult> CreateInvoice(CreateInvoiceDto dto, string callBackUrl)
        {
            if (packBuyRepo.HasActivePack(dto.UserId) != null)
            {
                return new ManagerResult<IPaymentRequestResult>(null, false)
                {
                    Code = 50,
                    Message = "HasPackageBefore"
                };
            }
            var user = userRepo.ReadWithType(dto.UserId);
            var pack = packRepo.Read(dto.PackId);
            decimal afterDiscount = pack.Price - (pack.Price * user.UserType.Discount / 100);
            var description = $"شما در حال خرید پکیج \"{pack.Title}\" در سامانه Magic Off هستید.";
            var result = onlinePayment.Request(invoice =>
            {
                invoice.UseZarinPal()
                       .UseAutoIncrementTrackingNumber()
                       .SetZarinPalData(description, "info@magicoff.ir", "۰۹۱۰۱۴۱۹۱۳۰")
                       .SetAmount(afterDiscount)
                       .SetCallbackUrl(callBackUrl);
            });
            var packBuy = new PackBuy
            {
                ObjectState = Core.Base.Enums.ObjectState.Added,
                PackId = pack.Id,
                Pack = pack,
                PayStatus = false,
                TrackingNumber = result.TrackingNumber,
                GatewayName = result.GatewayName,
                User = user,
                UserId = dto.UserId,
            };
            packBuyRepo.Save(packBuy);
            return new ManagerResult<IPaymentRequestResult>(result, result.IsSucceed)
            {
                Message = result.IsSucceed ? "Successful" : result.Message,
                Code = result.IsSucceed ? 200 : 19
            };
        }

        public ManagerResult<PagedListDto<PackBuyListDto>> GetLastFiveNewPayment()
        {
            var dto = new PageRequestDto<PackBuyListFilterDto>
            {
                Index = 1,
                MetaData = new PackBuyListFilterDto
                {
                    Status = true,
                    FromToPayDate = new FromToDto<DateTime?>(),
                    KeywordDto = new KeywordDto()
                },
                Order = Core.Base.Enums.SortOrder.DESC,
                Size = 5,
                SortField = "PayDate"
            };
            return Search(dto);
        }

        public ManagerResult<List<LineChartDto<decimal>>> GetPaymentLineChart()
        {
            var chartData = new List<LineChartDto<decimal>>();
            PersianCalendar pc = new();
            int year = pc.GetYear(DateTime.UtcNow);
            for (int i = 0; i < 12; i++)
            {
                DateTime start = new(year, 1 + i, 1, pc);
                DateTime end = i < 11 ? new DateTime(year, 2 + i, 1, pc) : new DateTime(year + 1, 1, 1, pc);
                var _month = packBuyRepo.Bucket().Where(x => x.PayDate >= start && x.PayDate < end && x.PayStatus == true);
                decimal _paid = _month.Include(x => x.Pack).Sum(x => x.Pack.Price);
                chartData.Add(new LineChartDto<decimal> { Data = _paid, Label = Utils.GetPersianMonthName(i + 1) });
            }
            return new ManagerResult<List<LineChartDto<decimal>>>(chartData);
        }

        public ManagerResult<ShopRankWithMinDto> GetRank()
        {
            PersianCalendar pc = new();
            int year = pc.GetYear(DateTime.UtcNow);
            int month = pc.GetMonth(DateTime.UtcNow);
            DateTime start = new(year, month, 1, pc);
            DateTime end = month < 11 ? new DateTime(year, month + 1, 1, pc) : new DateTime(year + 1, 1, 1, pc);

            var refCountList = packBuyRepo.GetSet()
                .Where(x => x.PayStatus == true && x.PayDate < end && x.PayDate >= start)
                .Include(x => x.User)
                .Select(x => new { name = x.User.Name, x.User.RefCode })
                .GroupBy(x => x.RefCode)
                .Select(g => new { refCode = g.Key, count = g.Count() });
            var result = refCountList.Join(shopRepo.GetSet(),
                refCount => refCount.refCode,
                shop => shop.ReferralCode,
                (refCount, shop) => new
                {
                    shop.Name,
                    refCount.count
                }).Select(x => new ShopRefCodeCountDto { Count = x.count, Name = x.Name }).ToList();
            var shops = shopRepo.GetSet().Where(x => !result.Select(y => y.Name).Contains(x.Name)).Select(x => x.Name).ToList();
            shops.ForEach(x => result.Add(new ShopRefCodeCountDto { Count = 0, Name = x }));
            var xResult = new ShopRankWithMinDto
            {
                Shops = result.OrderByDescending(x => x.Count).ToList(),
                Min = settingRepo.GetByName<int>("MinimumRef")
            };
            return new ManagerResult<ShopRankWithMinDto>(xResult);
        }

        public ManagerResult<PagedListDto<PackBuyListDto>> Search(PageRequestDto<PackBuyListFilterDto> dto)
        {
            var list = packBuyRepo.Search(dto);
            return new ManagerResult<PagedListDto<PackBuyListDto>>(list);
        }

        public ManagerResult<bool> SetMinLevel(int min)
        {
            settingRepo.Save("MinimumRef", min);
            return new ManagerResult<bool>(true);
        }

        public ManagerResult<bool> Verify(IPaymentVerifyResult result)
        {
            var invoice = packBuyRepo.Bucket().Where(x => x.GatewayName == result.GatewayName && x.TrackingNumber == result.TrackingNumber).FirstOrDefault();
            invoice.PayStatus = result.IsSucceed;
            invoice.PayDate = DateTime.UtcNow;
            packBuyRepo.Update(invoice);
            return new ManagerResult<bool>(true);
        }
    }
}
