namespace Core.Base.Dto
{
    public class KeyValueDto<T, R>
    {
        public T Key { get; set; }
        public R Value { get; set; }
    }
}
