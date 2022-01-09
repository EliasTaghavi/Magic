using Core.Base.Dto;
using Core.Base.Entities;
using Core.Identity.Dto;
using Core.Pack.Dto;
using Parbad;
using System.Collections.Generic;

namespace Core.Pack.Managers
{
    public interface IPackBuyManager
    {
        ManagerResult<IPaymentRequestResult> CreateInvoice(CreateInvoiceDto dto, string callBackUrl);
        ManagerResult<bool> Verify(IPaymentVerifyResult result);
        ManagerResult<PagedListDto<PackBuyListDto>> Search(PageRequestDto<PackBuyListFilterDto> dto);
        ManagerResult<PagedListDto<PackBuyListDto>> GetLastFiveNewPayment();
        ManagerResult<List<LineChartDto<decimal>>> GetPaymentLineChart();
    }
}
