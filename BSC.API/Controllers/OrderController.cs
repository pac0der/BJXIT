using BSC.Business.Interfaces;
using BSC.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BSC.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin,Staff")]
    public IActionResult GetAll()
    {
        var orders = _orderService.GetAll();
        return Ok(orders);
    }

    [HttpPost]
    [Authorize(Roles = "Seller")]
    public IActionResult PlaceOrder([FromBody] Order order)
    {
        try
        {
            var result = _orderService.PlaceOrder(order);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
