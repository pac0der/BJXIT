using BSC.Models.DTOs;
using BSC.Models.Entities;

namespace BSC.Business.Interfaces;
public interface IOrderService
{
    IEnumerable<Order> GetAll();
    Task<Order> PlaceOrder(Order order);
    Task<IEnumerable<OrderResponseDto>> GetAllWithSP();
}
