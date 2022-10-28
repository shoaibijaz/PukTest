using Application.Core;
using Application.DTOs;
using Application.Repositories.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserRepository repository, ILogger<UserController> logger)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUser()
        {
            var products = await _repository.GetUsers();
            return Ok(products);
        }

        [HttpGet("{id}", Name = "GetUser")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(UserDto), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var product = await _repository.GetUser(id);

            if (product == null)
            {
                _logger.LogError($"User with id: {id}, hasn't been found in database.");

                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Result<int>), (int)HttpStatusCode.Created)]
        public async Task<ActionResult<Result<int>>> CreateUser([FromBody] UserDto user)
        {
           
           return await _repository.AddNew(user);
        }

        [HttpPut]
        [ProducesResponseType(typeof(Result<int>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateUser([FromBody] UserDto value)
        {
            return Ok(await _repository.Update(value));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            return Ok(await _repository.DeleteUser(id));
        }
    }
}
