using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models;
using WebApi.Services;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly UserService _userService;
    private readonly TokenService _tokenService;

    public AuthController(UserService userService, TokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    [HttpPost("Login")]
    public async Task<ActionResult<ResponseModel<string>>> Login([FromBody] LoginRequest loginRequest)
    {
        var resposta = new ResponseModel<string>();
        
        var users = await _userService.ListarUsuarios();

        var user = users.Dados.FirstOrDefault(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password);

        if (user != null)
        {
            var token = _tokenService.GenerateToken(user.Email);
            resposta.Dados = token;
            resposta.Mensagem = "Login bem-sucedido";
            return Ok(resposta);
        }

        resposta.Mensagem = "Credenciais inválidas";
        resposta.Status = false;
        return Unauthorized(resposta);
    }
  }
}
