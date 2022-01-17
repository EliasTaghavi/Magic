namespace Core.Base.Entities
{
    public class Setting : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
    }
}
