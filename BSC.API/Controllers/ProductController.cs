using BSC.Business.Interfaces;
using BSC.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BSC.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAll()
    {
        var products = _productService.GetAll();
        return Ok(products);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Staff")]
    public IActionResult Add([FromBody] Product product)
    {
        try
        {
            var result = _productService.Add(product);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("report")]
    [Authorize(Roles = "Admin,Staff")]
    public IActionResult GetInventoryReport()
    {
        var report = _productService.GetInventoryReport();
        return Ok(report);
    }
}
