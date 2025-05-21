using BSC.Models.Entities;
using System.Collections.Generic;

namespace BSC.Business.Interfaces;
public interface IProductService
{
    IEnumerable<Product> GetAll();
    Product Add(Product product);
    IEnumerable<Product> GetInventoryReport();
}
