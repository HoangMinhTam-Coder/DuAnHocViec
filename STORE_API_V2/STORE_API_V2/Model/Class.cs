using System.ComponentModel.DataAnnotations;

namespace STORE_API_V2.Model
{
    public class Class
    {
        public string UserId { get; set; }
        public DateTime Time { get; set; }
        public string DiaChi { get; set; }
        public string Sdt { get; set; }
        public int IdProduct { get; set; }
        public int Quantity { get; set; }
    }
}
