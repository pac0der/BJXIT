using BSC.Business.Interfaces;
using BSC.DataAccess;
using BSC.Models.Entities;
using System.Text.RegularExpressions;

namespace BSC.Business.Services;
public class UserService : IUserService
{
    private readonly BscDbContext _context;

    public UserService(BscDbContext context)
    {
        _context = context;
    }

    public User? Authenticate(string username, string password)
    {
        var user = _context.Users.SingleOrDefault(x => x.Username == username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return user;
    }

    public User Create(User user, string password)
    {
        if (_context.Users.Any(x => x.Username == user.Username))
            throw new Exception("Username already exists");

        if (!IsPasswordValid(password))
            throw new Exception("Password must be at least 8 characters and contain letters and digits");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
        _context.Users.Add(user);
        _context.SaveChanges();

        return user;
    }

    private bool IsPasswordValid(string password)
    {
        return password.Length >= 8 && Regex.IsMatch(password, @"[a-zA-Z]") && Regex.IsMatch(password, @"\d");
    }
}
