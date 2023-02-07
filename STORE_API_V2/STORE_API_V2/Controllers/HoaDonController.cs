using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STORE_API_V2.Context;
using STORE_API_V2.Model;

namespace STORE_API_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public HoaDonController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpGet("GetHoaDon")]
        public async Task<ActionResult<HoaDon>> GetCart()
        {
            if (_authContext.HoaDons == null)
            {
                return NotFound();
            }
            return Ok(await _authContext.HoaDons.ToListAsync());
        }


        [HttpGet("GetHoaDonById")]
        public async Task<ActionResult<HoaDon>> GetOrderByUserId(int id)
        {
            var list = await _authContext.HoaDons.Where(x => x.UserId == id.ToString()).ToListAsync();

            if(list == null)
            {
                return NotFound(new { Message = "List Order Not Found"});
            }
            if (_authContext.HoaDons == null)
            {
                return NotFound(new {Message = "Hoa Don List Null"});
            }

            return Ok(list);
        }

        [HttpPost("AddHoaDon")]
        public async Task<IActionResult> AddCart([FromBody] HoaDon hd)
        {
            if (hd == null)
                return BadRequest(new { Message = "ERROR HD = NULL"});

            hd.Time = DateTime.Now;
            await _authContext.HoaDons.AddAsync(hd);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                id = hd.Id,
            });
        }

        [HttpGet("GetDetailOrder")]
        public async Task<IActionResult> GetDetailOrder(int id)
        {
            var prodList = await (from p in _authContext.HoaDons
                                  join pm in _authContext.ChiTietHoaDons on p.Id equals pm.IdHoaDon
                                  join ps in _authContext.Products on pm.IdProduct equals ps.Id
                                  select new Detail()
                                  {
                                      //products = p.ProductID,
                                      quantity = pm.Quantity,
                                      idOrder = p.Id,
                                      products = new Product(
                                          ps.Id,
                                          ps.Name,
                                          ps.Price,
                                          ps.category,
                                          ps.Color,
                                          ps.Image,
                                          ps.Image1,
                                          ps.Image2,
                                          ps.Size,
                                          ps.Sale,
                                          ps.Price_sale,
                                          ps.Description)
                                  }).Where(x => x.idOrder == id).ToListAsync();
            return Ok(prodList);
        }
    }
}
