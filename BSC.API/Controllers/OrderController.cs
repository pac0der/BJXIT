using BSC.Business.Interfaces;
using BSC.Models.DTOs;
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
    [Authorize(Roles = "Admin,Seller")]
    public async Task<IActionResult> PlaceOrder([FromBody] OrderRequest dto)
    {
        try
        {
            var order = new Order
            {
                CustomerName = dto.CustomerName,
                OrderDate = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity
                }).ToList()
            };

            var savedOrder = await _orderService.PlaceOrder(order);

            var response = new OrderResponseDto
            {
                Id = savedOrder.Id,
                OrderDate = savedOrder.OrderDate,
                CustomerName = savedOrder.CustomerName,
                Items = savedOrder.Items.Select(i => new OrderItemResponseDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.Product?.Name ?? string.Empty,
                    Quantity = i.Quantity
                }).ToList()
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
