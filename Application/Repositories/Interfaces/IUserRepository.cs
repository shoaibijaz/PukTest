

using Application.Core;
using Application.DTOs;

namespace Application.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<UserDto> GetUser(int Id);
        public Task<List<UserDto>> GetUsers();
        public Task<Result<int>> AddNew(UserDto user);
        public Task<Result<int>> Update(UserDto user);
        public Task<Result<int>> DeleteUser(int id);
    }
}
