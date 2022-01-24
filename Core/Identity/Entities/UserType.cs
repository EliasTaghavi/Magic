using Core.Base.Entities;

namespace Core.Identity.Entities
{
    public class UserType : BaseEntity
    {
        public string Name { get; set; }
        public int Discount { get; set; }
    }
}
