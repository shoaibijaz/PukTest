using API.Controllers;
using Application.DTOs;
using Application.Repositories.Interfaces;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.UnitTests
{
    public class UserControllerTests
    {
        private readonly Mock<IUserRepository> _mockRepo;
        private readonly Mock<ILogger<UserController>> _logger;
        private readonly UserController _controller;

        public UserControllerTests()
        {
            _mockRepo = new Mock<IUserRepository>();
            _logger = new();
            _controller = new UserController(_mockRepo.Object, _logger.Object);
        }

        [Fact]
        public async Task GetUsers_ActionExecutes_ReturnsUserDtoList()
        {
            var result = await _controller.GetUser();
            Assert.IsType<ActionResult<IEnumerable<UserDto>>>(result);
        }


        [Fact]
        public async Task GetUser_ActionExecutes_ReturnsNotFound_When_Id_0()
        {
            var result = await _controller.GetUser(0);
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task GetUser_ActionExecutes_ReturnsFound_When_Id_1()
        {
            var result = await _controller.GetUser(1);
            Assert.IsType<ActionResult<UserDto>>(result);
        }


    }
}
