using Microsoft.AspNetCore.Mvc;

namespace QuantumBudget.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BudgetController : Controller
    {
        
        [HttpGet]
        public IActionResult Get(int id)
        {
            return Ok(new { id });
        }

        [HttpGet]
        public ActionResult<> Generate(Budget input)
        {
            
        }
    }
}