using Core.Base.Dto;
using System;
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
                MetaData = func(viewModel.MetaData),
            };
        }
    }
}
