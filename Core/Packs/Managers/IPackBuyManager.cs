﻿using Core.Base.Dto;
using Core.Base.Entities;
using Core.Packs.Dto;
using Core.Shops.Dto;
using Parbad;

namespace Core.Packs.Managers
{
    public interface IPackBuyManager
    {
        ManagerResult<IPaymentRequestResult> CreateInvoice(CreateInvoiceDto dto, string callBackUrl);
        ManagerResult<bool> Verify(IPaymentVerifyResult result);
        ManagerResult<PagedListDto<PackBuyListDto>> Search(PageRequestDto<PackBuyListFilterDto> dto);
        ManagerResult<PagedListDto<PackBuyListDto>> GetLastFiveNewPayment();
        ManagerResult<List<LineChartDto<decimal>>> GetPaymentLineChart();
        ManagerResult<ShopRankWithMinDto> GetRank();
        ManagerResult<bool> SetMinLevel(int min);
    }
}
