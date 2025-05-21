namespace BSC.Models.DTOs
{
    public class OrderRequest
    {
        public string CustomerName { get; set; } = string.Empty;
        public List<OrderItemRequest> Items { get; set; } = new();
    }
}
