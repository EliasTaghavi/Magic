using Core.Base.Dto;
using System;
using System.Linq;
using Web.Models;

namespace Web.Mappers
{
    public static class CommonMapper
    {
        public static PageRequestDto<R> ToDto<T, R>(this PageRequestViewModel<T> viewModel, Func<T, R> func)
        {
            return new PageRequestDto<R>
            {
                Index = viewModel.Index,
                Size = viewModel.Size,
                Order = viewModel.Order,
                SortField = viewModel.SortField,
                MetaData = func(viewModel.MetaData),
            };
        }

        public static PageResponseViewModel<R> ToViewModel<T, R>(this PagedListDto<T> dto, Func<T, R> func)
        {
            return new PageResponseViewModel<R>
            {
                Count = dto.Count,
                Items = dto.Items.Select(x => func(x)).ToList(),
            };
        }
    }
}
