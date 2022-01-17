using Core.Base.Enums;

namespace Web.Models
{
    public class PageRequestViewModel<T>
    {
        public int Index { get; set; }
        public int Size { get; set; }
        public string SortField { get; set; }
        public SortOrder Order { get; set; }
        public T MetaData { get; set; }
    }
}
