namespace Core.Base.Dto
{
    public class PagedListDto<T>
    {
        public int Count { get; set; }
        public List<T> Items { get; set; }
    }
}
