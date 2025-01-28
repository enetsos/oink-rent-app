using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public static User user = new User();

        [HttpPost("register")]
        public ActionResult<User> Register(UserDto req)
        {
            var hasehdPassword = new PasswordHasher<User>().HashPassword(new User(), req.Password);

            user.Username = req.Username;
            user.PasswordHash = hasehdPassword;

            return user;
        }


    }
}