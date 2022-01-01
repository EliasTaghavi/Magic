namespace Web.Models
{
    public class PageRequestViewModel<T>
    {
        public int Index { get; set; }
        public int Size { get; set; }
        public T MetaData { get; set; }
    }
}
