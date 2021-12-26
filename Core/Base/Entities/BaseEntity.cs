using Core.Base.Enums;
using System;

namespace Core.Base.Entities
{
    public class BaseEntity
    {
        public DateTime CreatedDate { get; set; }
        public bool? Enable { get; set; } = false;
        public string Id { get; set; }
        public ObjectState ObjectState { get; set; }
    }
}
