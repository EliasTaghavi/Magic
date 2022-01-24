namespace Web.Models.Pack
{
    public class PagedListPackWithUserTypeOffViewModel
    {
        public PageResponseViewModel<PackListViewModel> List { get; set; }
        public int Discount { get; set; }
        public bool HasActivePack { get; set; }
    }
}
