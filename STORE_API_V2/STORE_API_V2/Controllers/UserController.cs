using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STORE_API_V2.Context;
using STORE_API_V2.Model;
using System.Linq.Expressions;
using System.Net;
using System.Text.RegularExpressions;
using System.Text;
using STORE_API_V2.Helps;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Build.Tasks;

namespace STORE_API_V2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;
        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<User>> GetUses()
        {
            if(_authContext.Users ==null)
            {
                return NotFound();
            }
            return Ok(await _authContext.Users.ToListAsync());
        }

        

        private Task<bool> CheckUserNameExítAsync(string Name)
            => _authContext.Users.AnyAsync(x => x.Name == Name);

        private Task<bool> CheckEmailExítAsync(string email)
            => _authContext.Users.AnyAsync(x => x.Email == email);

        private string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 8)
            {
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            }
            if (!(
                Regex.IsMatch(pass, "[a-z]")
                && Regex.IsMatch(pass, "[A-Z]")
                && Regex.IsMatch(pass, "[0-9]")))
            {
                sb.Append("Minimum should be Alphanumeric" + Environment.NewLine);
            }
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:.;|,',\\,.,/,~,`,-,=]"))
            {
                sb.Append("Password should be container special chars" + Environment.NewLine);
            }

            return sb.ToString();
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            // Check Username
            if (await CheckUserNameExítAsync(userObj.Name))
            {
                return BadRequest(new { Message = "Username Already Exist" });
            }
            // Check Email
            if (await CheckEmailExítAsync(userObj.Email))
            {
                return BadRequest(new { Message = "Email Already Exist" });
            }
            // Check Pass
            var pass = CheckPasswordStrength(userObj.Password); ;
            if (!string.IsNullOrEmpty(pass))
            {
                return BadRequest(new { Message = pass.ToString() });
            }

            userObj.Password = PasswordHashing.HashPassword(userObj.Password);
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Register!", user = userObj
            });
        }

        [HttpPut]
        public async Task<ActionResult<User>> PushUser(int id, User user)
        {
            if(id != user.Id)
            {
                return BadRequest(new { Message = "Id Error" });
            }

            _authContext.Entry(user).State= EntityState.Modified;

            try
            {
                await _authContext.SaveChangesAsync();

            } catch (DbUpdateConcurrencyException)
            {
                if (!UserAvailable(id))
                {
                    return NotFound(new { Message = "Update Fail" });
                }
                else
                {
                    throw;
                }
            }
            return Ok(new { Message = "Update Success" });
        }

        private bool UserAvailable(int id)
        {
            return (_authContext.Users?.Any(u => u.Id == id)).GetValueOrDefault();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUses(int id)
        {
            var user = await _authContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "Id User Not Found" });
            }
            return user;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _authContext.Users.FindAsync(id);
            if(user == null)
            {
                return NotFound(new { Message = "Id Not Found" });
            }
            if(_authContext.Users == null)
            {
                return NotFound(new { Message = "DB Null" });
            }
            _authContext.Users.Remove(user);
            
            await _authContext.SaveChangesAsync();
            
            return(Ok(new { Message = "Delete Success" }));
        }

        // Create Token
        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name, $"{user.Name}"),
                new Claim(ClaimTypes.Email, $"{user.Email}"),
            });

            var credetial = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credetial
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Authenticate(string email, string password)
        {
            if (email == null || password == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
                return NotFound(new { Message = "User Not Found!" });

            if (!PasswordHashing.VerifyPassword(password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect!" });
            }

            var Token = CreateJwt(user);

            var userRe = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == email && PasswordHashing.VerifyPassword(password, user.Password));

            return Ok(new
            {
                User = userRe,
                Tokens = Token,
                Message = "Login Success BE!"
            });
        }

        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetListUser()
        {
            var ListUser = await _authContext.Users.Where(x => x.Role == "User").ToListAsync();

            if(ListUser == null)
            {
                return BadRequest(new { Message = "Not Found List User Role" });
            }

            return Ok(ListUser);
        }
    }
}
