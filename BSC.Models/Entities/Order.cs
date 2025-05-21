﻿namespace BSC.Models.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }
}
