using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using STORE_API_V2.Context;
using STORE_API_V2.Model;

namespace STORE_API_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHoaDonController : ControllerBase
    {

        private readonly AppDbContext _authContext;
        public ChiTietHoaDonController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpPost("AddChiTietHoaDon")]
        public async Task<IActionResult> AddChiTietHoaDon(int idhd, [FromBody] ChiTietHoaDon hd)
        {
            if (idhd == 0)
            {
                return BadRequest(new { Message = "Id Hd Not Found"});
            }
            hd.IdHoaDon = idhd;

            await _authContext.ChiTietHoaDons.AddAsync(hd);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                hd
            });
        }
    }
}
