using Microsoft.AspNetCore.Http.HttpResults;
using System.Data;
using System.Net;
using System.Runtime.Intrinsics.X86;
using System.Security.Principal;
using System.Xml.Linq;
using System.ComponentModel.DataAnnotations;
namespace STORE_API_V2.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Avt { get; set; }
        public string SDT { get; set; }
        public string Role { get; set; }
    }
}
