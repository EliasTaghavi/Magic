using Core.Base.Entities;
using Core.Pack.Dto;
using Parbad;

namespace Core.Pack.Managers
{
    public interface IPackBuyManager
    {
        ManagerResult<IPaymentRequestResult> CreateInvoice(CreateInvoiceDto dto);
    }
}
