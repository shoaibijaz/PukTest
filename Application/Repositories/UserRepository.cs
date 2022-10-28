using Application.Core;
using Application.DTOs;
using Application.Repositories.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Repositories
{
    public class UserRepository : IUserRepository
    {
        public readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IValidator<UserDto> _validator;

        public UserRepository(UserManager<AppUser> userManager, IMapper mapper, IValidator<UserDto> validator)
        {
            _userManager = userManager;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<UserDto> GetUser(int Id)
        {
            var user = await _userManager.FindByIdAsync(Id.ToString());

            return new UserDto()
            {
                Id = Id,
                Name = user.UserName
            };
        }

        public async Task<List<UserDto>> GetUsers()
        {
            var users = _userManager.Users.OrderByDescending(a => a.Id);

            return await users.ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<Result<int>> AddNew(UserDto user)
        {
            var validate = await _validator.ValidateAsync(user, opt=>
            {
                opt.IncludeRulesNotInRuleSet();
                opt.IncludeRuleSets("Password");
            });

            var result = new Result<int>();

            if (!validate.IsValid)
            {
                result = Result<int>.Failure(validate.Errors.Select(a => a.ErrorMessage).ToArray());
            }
            else
            {
                result = await _addNewUser(user);
            }
            
            return result;
        }

        public async Task<Result<int>> Update(UserDto user)
        {
            var validate = await _validator.ValidateAsync(user, opt =>
            {
                opt.IncludeRulesNotInRuleSet();
                opt.IncludeRuleSets("Id");
            });

            var result = new Result<int>();

            if (!validate.IsValid)
            {
                result = Result<int>.Failure(validate.Errors.Select(a => a.ErrorMessage).ToArray());
            }
            else
            {
                result = await _updateUser(user);
            }

            return result;
        }

        public async Task<Result<int>> DeleteUser(int id)
        {
            var userObject = await _userManager.FindByIdAsync(id.ToString());
            var result = await _userManager.DeleteAsync(userObject);

            if (!result.Succeeded)
            {
                return Result<int>.Failure(result.Errors.Select(a => a.Description).ToArray());
            }

            return Result<int>.Success(id);
        }

        private async Task<Result<int>> _addNewUser(UserDto user)
        {
            var appUser = new AppUser()
            {
                UserName = user.Email,
                Email = user.Email,
                Name = user.Name,
                Suspended = false
            };

            var result = await _userManager.CreateAsync(appUser, user.Password);

            if (!result.Succeeded)
            {
                return Result<int>.Failure(result.Errors.Select(a => a.Description).ToArray());
            }

            return Result<int>.Success(appUser.Id);
        }

        private async Task<Result<int>> _updateUser(UserDto user)
        {
            var appUser = await _userManager.FindByIdAsync(user.Id.ToString());

            if (appUser == null)
                return Result<int>.Failure(new string[] { "User not found, Id is not valid" });

            appUser.UserName = user.Email;
            appUser.Name = user.Name;
            appUser.Email = user.Email;
            appUser.Suspended = user.Suspended;

            var result = await _userManager.UpdateAsync(appUser);

            if (!result.Succeeded)
            {
                return Result<int>.Failure(result.Errors.Select(a => a.Description).ToArray());
            }

            return Result<int>.Success(appUser.Id);
        }
    }
}
