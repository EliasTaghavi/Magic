using Newtonsoft.Json;
using System;
using Web.JsonConverter;

namespace Web.Models.Payment
{
    public class PackBuyListFilterViewModel
    {
        public bool? Status { get; set; }
        public KeywordViewModel Keyword { get; set; }

        [JsonConverter(typeof(FromToDateTimeJsonConverter))]
        public FromToViewModel<DateTime?> FromToPayDate { get; set; }
    }
}
