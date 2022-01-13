using System;

namespace Web.Models.Payment
{
    public class PackBuyListFilterViewModel
    {
        public bool? Status { get; set; }
        public KeywordViewModel Keyword { get; set; }
        public FromToViewModel<DateTime?> FromToPayDate { get; set; }
    }
}
