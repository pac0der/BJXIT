using BSC.Models.Entities;

namespace BSC.Business.Interfaces;
public interface IUserService
{
    User? Authenticate(string username, string password);
    User Create(User user, string password);
}
