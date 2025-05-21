using BSC.Models.Entities;
using System.Collections.Generic;

namespace BSC.Business.Interfaces;
public interface IOrderService
{
    IEnumerable<Order> GetAll();
    Order PlaceOrder(Order order);
}
