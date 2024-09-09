using WebApi.Models;
using WebApi.Data;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResponseModel<List<UserModel>>> ListarUsuarios()
        {
            ResponseModel<List<UserModel>> resposta = new ResponseModel<List<UserModel>>();
            try
            {
                var usuarios = await _context.Users.ToListAsync();
                resposta.Dados = usuarios;
                return resposta;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
                return resposta;
            }
        }

        public async Task<ResponseModel<UserModel>> AdicionarUsuario(UserModel novoUsuario)
        {
            ResponseModel<UserModel> resposta = new ResponseModel<UserModel>();
            try
            {
                _context.Users.Add(novoUsuario);
                await _context.SaveChangesAsync();
                resposta.Dados = novoUsuario;
                resposta.Mensagem = "Usuário adicionado com sucesso";
                return resposta;
            }
            catch (Exception ex)
            {
                resposta.Mensagem = ex.Message;
                resposta.Status = false;
                return resposta;
            }
        }
    }
}
