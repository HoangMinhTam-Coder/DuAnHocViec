using System.ComponentModel.DataAnnotations;

namespace STORE_API_V2.Model
{
    public class ChiTietHoaDon
    {
        [Key]
        public int Id { get; set; }
        public int IdHoaDon { get; set; }
        public int IdProduct { get; set; }
        public int  Quantity { get; set; }
    }
}
