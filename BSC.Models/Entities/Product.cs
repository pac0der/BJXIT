namespace BSC.Models.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductKey { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
