using System.ComponentModel.DataAnnotations;

namespace STORE_API_V2.Model
{
    public class HoaDon
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime Time { get; set; }
        public string DiaChi { get; set; }
        public string Sdt { get; set;}
    }
}
