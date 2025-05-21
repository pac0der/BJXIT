using BSC.Business.Interfaces;
using BSC.DataAccess;
using BSC.Models.Entities;

namespace BSC.Business.Services;
public class ProductService : IProductService
{
    private readonly BscDbContext _context;

    public ProductService(BscDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Product> GetAll()
    {
        return _context.Products.ToList();
    }

    public Product Add(Product product)
    {
        if (_context.Products.Any(p => p.ProductKey == product.ProductKey))
            throw new Exception("Product key must be unique");

        _context.Products.Add(product);
        _context.SaveChanges();
        return product;
    }
}
