using Core.Base.Settings;
using Core.Services;
using Kavenegar;
using Kavenegar.Core.Exceptions;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class SMSService : ISMSService
    {
        private readonly SMSSettings settings;

        public SMSService(IOptionsMonitor<SMSSettings> options)
        {
            settings = options.CurrentValue;
        }

        public void SendConfirm(string mobile, string fullname)
        {
            if (settings.Enable)
            {
                KavenegarApi api = new(settings.APIKey);
                api.Send(mobile, fullname, "offitconfirm").Wait();
            }
        }

        public void SendReject(string mobile, string cause)
        {
            if (settings.Enable)
            {
                KavenegarApi api = new(settings.APIKey);
                api.VerifyLookup(mobile, cause, "offitreject").Wait();
            }
        }

        public async Task Verification(string Message, string Phone)
        {
            if (settings.Enable)
            {
                try
                {
                    //List<string> receptors = new List<string> { $"{Phone}" };

                    KavenegarApi api = new(settings.APIKey);

                    Kavenegar.Core.Models.SendResult result = await api.VerifyLookup(Phone, Message, "offitlogin");

                    //foreach (Kavenegar.Core.Models.SendResult r in result)
                    //{
                    Console.Write($"{result.Messageid}");
                    //}
                }
                catch (ApiException ex)
                {
                    // در صورتی که خروجی وب سرویس 200 نباشد این خطارخ می دهد.
                    throw new Exception("Message : " + ex.Message);
                }
                catch (HttpException ex)
                {
                    // در زمانی که مشکلی در برقرای ارتباط با وب سرویس وجود داشته باشد این خطا رخ می دهد
                    throw new Exception("Message : " + ex.Message);
                }
            }
        }
    }
}
