using BSC.Models.Entities;

namespace BSC.Business.Interfaces;
public interface IOrderService
{
    IEnumerable<Order> GetAll();
    Task<Order> PlaceOrder(Order order);
}
