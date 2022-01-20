global using System;
global using System.Collections.Generic;
global using System.Linq;
using Core.Base.Enums;

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
