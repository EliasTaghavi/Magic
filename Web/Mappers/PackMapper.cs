﻿using Core.Pack.Dto;
using Core.Pack.Entities;
using Web.Models.Pack;

namespace Web.Mappers
{
    public static class PackMapper
    {
        public static PackFilterDto ToDto(this PackFilterViewModel viewModel)
        {
            return new PackFilterDto
            {
                Title = viewModel.Title,
            };
        }

        public static PackListViewModel ToViewModel(this PackListDto dto)
        {
            return new PackListViewModel
            {
                DayCount = dto.DayCount,
                Description = dto.Description,
                Id = dto.Id,
                Price = dto.Price,
                Title = dto.Title,
            };
        }

        public static Pack ToDataModel(this CreatePackViewModel viewModel)
        {
            return new Pack
            {
                Title = viewModel.Title,
                Price = viewModel.Price,
                DayCount = viewModel.DayCount,
                Description = viewModel.Description,
                ObjectState = Core.Base.Enums.ObjectState.Added
            };
        }

        public static CreateInvoiceDto ToDto(this CreateInvoiceViewModel viewModel, string userId)
        {
            return new CreateInvoiceDto
            {
                PackId = viewModel.PackId,
                UserId = userId,
            };
        }
    }
}