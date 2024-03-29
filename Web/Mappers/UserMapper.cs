﻿using Core.Identity.Dto;
using Core.Identity.Entities;
using Core.Services.Dto;
using Web.Models.User;

namespace Web.Mappers
{
    public static class UserMapper
    {
        public static CreateUserDto ToDto(this CreateUserViewModel viewModel)
        {
            return new CreateUserDto
            {
                Phone = viewModel.Phone,
                FirstName = viewModel.FirstName,
                Lastname = viewModel.Lastname,
            };
        }

        public static UserFillDataDto ToDto(this UserFillDataViewModel viewModel)
        {
            return new UserFillDataDto
            {
                Address = viewModel.Address,
                Birthday = viewModel.Birthday,
                FirstName = viewModel.FirstName,
                LastName = viewModel.LastName,
                RefCode = viewModel.RefCode,
                Password = viewModel.Password,
            };
        }

        public static UserListFilterDto ToDto(this UserListFilterViewModel viewModel)
        {
            return new UserListFilterDto
            {
                Status = viewModel.Status,
                Mobile = viewModel.Mobile,
            };
        }

        public static UserListViewModel ToViewModel(this UserListDto dto)
        {
            return new UserListViewModel
            {
                Address = dto.Address,
                Birthday = dto.Birthday,
                FirstName = dto.FirstName,
                Id = dto.Id,
                IdentityURL = dto.IdentityURL,
                LastName = dto.LastName,
                Mobile = dto.Mobile,
                SelfieURL = dto.SelfieURL,
                Status = dto.Status,
                CeatedDate = dto.CreatedDate,
                TypeId = dto.TypeId,
                Roles = dto.Roles
            };
        }
        public static RejectMessageDto ToDto(this RejectMessageViewModel viewModel)
        {
            return new RejectMessageDto
            {
                Message = viewModel.Message,
                UserId = viewModel.UserId,
            };
        }

        public static ConfirmUserDto ToDto(this ConfirmUserViewModel viewModel)
        {
            return new ConfirmUserDto
            {
                TypeId = viewModel.TypeId,
                UserId = viewModel.UserId,
            };
        }

        public static ChangePasswordDto ToDto(this ChangePasswordViewModel viewModel, string userId)
        {
            return new ChangePasswordDto
            {
                UserId = userId,
                NewPassword = viewModel.NewPassword,
                OldPassword = viewModel.OldPassword,
            };
        }

        public static CreateExpertDto ToDto(this CreateExpertViewModel viewModel)
        {
            return new CreateExpertDto
            {
                Address = viewModel.Address,
                Birthday = viewModel.Birthday,
                Mobile = viewModel.Mobile,
                Name = viewModel.Name,
                Password = viewModel.Password,
                Surname = viewModel.Surname,
                UserTypeId = viewModel.UserTypeId,
            };
        }

        public static UserProfileViewModel ToViewModel(this User user, string identityURL, string selfieURL, bool hasPack)
        {
            return new UserProfileViewModel
            {
                Address = user.Address,
                Birthday = user.Birthday,
                Mobile = user.Mobile,
                FirstName = user.Name,
                LastName = user.Surname,
                IsStudent = user.UserStatus == Core.Identity.Enums.UserStatus.PhoneConfirmed || user.UserType.Name == "دانشجو",
                IdentityURL = identityURL,
                SelfieURL = selfieURL,
                HasActivePack = hasPack,
                Roles = user.Roles.Select(x => x.Name).ToList(),
                Status = user.UserStatus,
                TypeId = user.UserTypeId
            };
        }

        public static EditUserDto ToDto(this EditUserViewModel viewModel, string userId)
        {
            return new EditUserDto
            {
                Address = viewModel.Address,
                Birthday = viewModel.Birthday,
                Name = viewModel.Name,
                Surname = viewModel.Surname,
                Id = userId,
                RefCode = viewModel.RefCode,
                TypeId = viewModel.TypeId
            };
        }
    }
}
