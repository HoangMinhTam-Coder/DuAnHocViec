using Azure;
using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STORE_API_V2.Context;
using STORE_API_V2.Helps;
using STORE_API_V2.Model;

namespace STORE_API_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public ProductController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpGet("GetProduct")]
        public async Task<ActionResult<Product>> GetProduct()
        {
            if (_authContext.Products == null)
            {
                return NotFound();
            }
            return Ok(new { ds = _authContext.Products.ToListAsync() });
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Product pro)
        {
            if (pro == null)
                return BadRequest();

            // Check Username
            if (await CheckUserNameExitAsync(pro.Name))
            {
                return BadRequest(new { Message = "Username Already Exist" });
            }

            await _authContext.Products.AddAsync(pro);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Add Product Success!"
            });
        }

        private Task<bool> CheckUserNameExitAsync(string Name)
            => _authContext.Users.AnyAsync(x => x.Name == Name);

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var pro = await _authContext.Products.FindAsync(id);
            if (pro == null)
            {
                return NotFound(new { Message = "Product(Id) Not Found" });
            }
            if (_authContext.Products == null)
            {
                return NotFound(new { Message = "DB Null" });
            }
            _authContext.Products.Remove(pro);

            await _authContext.SaveChangesAsync();

            return (Ok(new { Message = "Delete Product Success" }));
        }

        [HttpPut("PutProduct")]
        public async Task<ActionResult<Product>> PushProduct(int id, Product pro)
        {
            if (id != pro.Id)
            {
                return BadRequest(new { Message = "Id Product Error" });
            }

            _authContext.Entry(pro).State = EntityState.Modified;

            try
            {
                await _authContext.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductAvailable(id))
                {
                    return NotFound(new { Message = "Update Product Fail" });
                }
                else
                {
                    throw;
                }
            }
            return Ok(new
            {
                product = pro,
                Message = "Update Product Success"
            });
        }

        private bool ProductAvailable(int id)
        {
            return (_authContext.Products?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        [HttpGet("GetProductById")]
        public async Task<ActionResult<Product>> GetProduttBuyid(int id)
        {
            var cart = await _authContext.Products.FindAsync(id);
            if (_authContext.Products == null)
            {
                return NotFound(new { Message = "Id Product Not Found" });
            }
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart);
        }

        [HttpGet("GetProductLimit")]
        public async Task<ActionResult<Product>> GetProductLimit()
        {
            var list = await _authContext.Products.Where(x => x.Id <= 9).ToArrayAsync();
            if (_authContext.Users == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpGet("GetProductTren")]
        public async Task<ActionResult<Product>> GetProductTren()
        {
            var list = await _authContext.Products.Where(x => x.Id < 6).ToArrayAsync();
            if (_authContext.Users == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpGet("GetProductPops")]
        public async Task<ActionResult<Product>> GetProductPops()
        {
            var list = await _authContext.Products.Where(x => x.Id >= 4 & x.Id <= 8).ToArrayAsync();
            if (_authContext.Users == null)
            {
                return NotFound();
            }
            return Ok(list);
        }

        [HttpGet("SearchProduct")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProduct(string query)
        {
            IQueryable<Product> querys = _authContext.Products;
            if(!string.IsNullOrEmpty(query))
            {
                querys = querys.Where(a => a.Name.Contains(query));
            }

            var list = await querys.ToListAsync(); 
            return Ok(list);
        }

        [HttpGet("FilterColor")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProductByColor(string color)
        {
            IQueryable<Product> querys = _authContext.Products;
            if (!string.IsNullOrEmpty(color))
            {
                querys = querys.Where(a => a.Color.Contains(color ));
            }

            var list = await querys.ToListAsync();
            return Ok(list);
        }

        [HttpGet("FilterCategory")]
        public async Task<ActionResult<IEnumerable<Product>>> SearchProductByCategory(string catergory)
        {
            IQueryable<Product> querys = _authContext.Products;
            if (!string.IsNullOrEmpty(catergory))
            {
                querys = querys.Where(a => a.category.Contains(catergory));
            }

            var list = await querys.ToListAsync();
            return Ok(list);
        }

        [HttpGet("SortByPrice")]
        public async Task<ActionResult<Product>> SortPrice(string sortBy)
        {
            var allproducts = _authContext.Products.OrderBy(hh => hh.Price);
            if (!string.IsNullOrEmpty(sortBy))
            {
                switch(sortBy)
                {
                    case "price_desc": allproducts = allproducts.OrderByDescending(hh => hh.Price); break;
                    case "price_asc": allproducts = allproducts.OrderBy(hh => hh.Price); break;
                }
            }

            return Ok(allproducts);
        }
    }
}
