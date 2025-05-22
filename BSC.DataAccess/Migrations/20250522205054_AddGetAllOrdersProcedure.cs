using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BSC.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddGetAllOrdersProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE PROCEDURE GetAllOrders
                AS
                BEGIN
                    SELECT 
                        o.Id AS OrderId,
                        o.CustomerName,
                        o.OrderDate,
                        oi.Id AS OrderItemId,
                        oi.ProductId,
                        p.Name AS ProductName,
                        oi.Quantity
                    FROM Orders o
                    INNER JOIN OrderItems oi ON o.Id = oi.OrderId
                    INNER JOIN Products p ON oi.ProductId = p.Id
                    ORDER BY o.Id, oi.Id;
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE GetAllOrders");
        }
    }
}
