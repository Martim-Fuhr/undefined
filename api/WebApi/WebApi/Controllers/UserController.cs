using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly TokenService _tokenService;

        public UserController(UserService userService, TokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpGet("ListarUsuarios")]
        public async Task<ActionResult<ResponseModel<List<UserModel>>>> ListarUsuarios()
        {
            var resposta = await _userService.ListarUsuarios();
            return Ok(resposta);
        }

        [HttpPost("AdicionarUsuario")]
        public async Task<ActionResult<ResponseModel<UserModel>>> AdicionarUsuario([FromBody] UserModel user)
        {
            // Criptografa o email e senha usando o Token JWT
            user.Email = _tokenService.GenerateToken(user.Email);
            user.Password = _tokenService.GenerateToken(user.Password);

            var resposta = await _userService.AdicionarUsuario(user);
            return Ok(resposta);
        }
    }
}
