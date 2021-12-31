namespace Core.Base.Dto
{
    public class PageRequestDto<R>
    {
        public int Index { get; set; }
        public int Size { get; set; }
        public R MetaData { get; set; }
    }
}
