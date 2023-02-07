using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Tasks.Deployment.Bootstrapper;
using Microsoft.EntityFrameworkCore;
using STORE_API_V2.Context;
using STORE_API_V2.Helps;
using STORE_API_V2.Model;
using Product = STORE_API_V2.Model.Product;

namespace STORE_API_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public CartController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpGet("GetCart")]
        public async Task<ActionResult<User>> GetCart()
        {
            if (_authContext.Carts == null)
            {
                return NotFound();
            }
            return Ok(await _authContext.Carts.ToListAsync());
        }

        [HttpGet("GetCartByUserId")]
        public async Task<ActionResult<Cart>> GetCartByUserId(int id)
        {
            var list = await _authContext.Carts.Where(u => u.UserID == id).ToListAsync();
            if (_authContext.Carts == null)
            {
                return NotFound();
            }
            if(list == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        // Xóa cart dựa vào product và userid

        [HttpPost("AddCart")]
        public async Task<IActionResult> AddCart([FromBody] Cart cart)
        {
            if (cart == null)
                return BadRequest();

            await _authContext.Carts.AddAsync(cart);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Add Cart Success!"
            });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var pro = await _authContext.Carts.FindAsync(id);
            if (pro == null)
            {
                return NotFound(new { Message = "Product(Id) Not Found" });
            }
            if (_authContext.Carts == null)
            {
                return NotFound(new { Message = "DB Null" });
            }
            _authContext.Carts.Remove(pro);

            await _authContext.SaveChangesAsync();

            return (Ok(new { Message = "Delete Cart Success" }));
        }

        [HttpDelete("DeleteCartByProUserId")]
        public async Task<ActionResult> DeleteCartByProUserId(int ui, int pi)
        {
            var pro = await _authContext.Carts
                .Where(u => u.UserID == ui)
                .Where(u => u.ProductID == pi).FirstOrDefaultAsync();

            var user = await _authContext.Users.FindAsync(ui);
            var product = await _authContext.Products.FindAsync(pi);

            if (pro == null)
            {
                return NotFound(new { Message = "Product(Id) Not Found" });
            }
            if (_authContext.Carts == null)
            {
                return NotFound(new { Message = "DB Null" });
            }
            _authContext.Carts.Remove(pro);

            await _authContext.SaveChangesAsync();

            return (Ok(new { Message = "Delete Product Success" , pro = pro, user = user, product = product})) ;
        }

        [HttpDelete("DelAllId")]
        public async Task<ActionResult> DelAllId(int ui, int pi)
        {
            var pro = await _authContext.Carts
                .Where(u => u.UserID == ui &  u.ProductID == pi).ToListAsync();

            var user = await _authContext.Users.FindAsync(ui);
            var product = await _authContext.Products.FindAsync(pi);

            if (pro == null)
            {
                return NotFound(new { Message = "List Cart By Id Not Found" });
            }
            if (_authContext.Carts == null)
            {
                return NotFound(new { Message = "DB Null" });
            }
            _authContext.Carts.RemoveRange(pro);

            await _authContext.SaveChangesAsync();

            return (Ok(new { Message = "Delete Product Success", pro = pro, user = user, product = product }));
        }

        [HttpDelete("DelCartByUserId")]
        public async Task<ActionResult> DeleteCartByUserId(int ui)
        {
            var pro = await _authContext.Carts
                .Where(u => u.UserID == ui).ToListAsync();

            var user = await _authContext.Users.FindAsync(ui);


            if (pro == null)
            {
                return NotFound(new { Message = "List Cart By Id Not Found" });
            }
            if (_authContext.Carts == null)
            {
                return NotFound(new { Message = "DB Null" });
            }
            _authContext.Carts.RemoveRange(pro);

            await _authContext.SaveChangesAsync();

            return (Ok(new { Message = "Delete Product Success", pro = pro, user = user }));
        }

        [HttpGet("GetInitCart")]
        public async Task<ActionResult> GetInitCart(int id)
        {
            var prodList = await (from p in _authContext.Carts
                            join pm in _authContext.Products on p.ProductID equals pm.Id
                            select new InitCart()
                            {
                                //products = p.ProductID,
                                userId = p.UserID,
                                products = new Product(
                                    pm.Id,
                                    pm.Name,
                                    pm.Price,
                                    pm.category,
                                    pm.Color,
                                    pm.Image,
                                    pm.Image1,
                                    pm.Image2,
                                    pm.Size,
                                    pm.Sale,
                                    pm.Price_sale,
                                    pm.Description)
                            }).Where(x => x.userId == id).ToListAsync();
            return Ok(prodList);
        }
    }
}
