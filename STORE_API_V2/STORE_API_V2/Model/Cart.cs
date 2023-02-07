using System.ComponentModel.DataAnnotations;
namespace STORE_API_V2.Model
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public int ProductID { get; set; }
        public int UserID { get; set; }
    }
}
