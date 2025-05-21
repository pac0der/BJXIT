using BSC.Business.Interfaces;
using BSC.Models.DTOs;
using BSC.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BSC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public IActionResult CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                var user = new User
                {
                    Username = request.Username,
                    Role = request.Role
                };

                var createdUser = _userService.Create(user, request.Password);
                return Ok(new { createdUser.Id, createdUser.Username, createdUser.Role });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
