﻿using Microsoft.AspNetCore.Http;

namespace Web.Models.Shop
{
    public class AddShopPhotosViewModel
    {
        public IFormFileCollection Files { get; set; }
        public List<string> Deleted { get; set; }
        public string ShopId { get; set; }
    }
}
