using Core.Base.Entities;

namespace Core.Identity.Entities
{
    public class Role : BaseEntity
    {
        public string EnName { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
