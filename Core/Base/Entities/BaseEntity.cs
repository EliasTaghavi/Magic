using Core.Base.Enums;
using System;

namespace Core.Base.Entities
{
    public class BaseEntity
    {
        public string Id { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public bool? Enable { get; set; } = true;
        public ObjectState ObjectState { get; set; }
    }
}
