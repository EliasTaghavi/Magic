namespace Web.Models
{
    public class PageResponseViewModel<T>
    {
        public int Count { get; set; }
        public List<T> Items { get; set; }
    }
}
