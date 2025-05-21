using BSC.Business.Interfaces;
using BSC.DataAccess;
using BSC.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BSC.Business.Services;
public class OrderService : IOrderService
{
    private readonly BscDbContext _context;

    public OrderService(BscDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Order> GetAll()
    {
        return _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .ToList();
    }

    public async Task<Order> PlaceOrder(Order order)
    {
        foreach (var item in order.Items)
        {
            var product = await _context.Products.SingleOrDefaultAsync(p => p.Id == item.ProductId);
            if (product == null || product.Stock < item.Quantity)
                throw new Exception($"Insufficient stock for product ID {item.ProductId}");

            product.Stock -= item.Quantity;
        }

        order.OrderDate = DateTime.UtcNow;
        _context.Orders.Add(order);
        _context.SaveChanges();
        return order;
    }
}
