using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using multiselect.Data;
using multiselect.Models;

namespace multiselect.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MultiselectContext _db;

        public HomeController(ILogger<HomeController> logger, MultiselectContext db)
        {
            _logger = logger;
            _db = db;
        }

        public IActionResult Index()
        {
            return View(new SelectionOperations().getAllUsers(_db));
        }

        public JsonResult Select(int id)
        {
            new SelectionOperations().Select(id, _db);
            
            return Json(new { Success = "Success" });
        }

        public JsonResult Deselect(int id)
        {
            new SelectionOperations().Deselect(id, _db);

            return Json(new { Success = "Success" });
        }

        public JsonResult SelectAll()
        {
            new SelectionOperations().SelectAll(_db);

            return Json(new { Success = "Success" });
        }

        public JsonResult DeselectAll()
        {
            new SelectionOperations().DeselectAll(_db);

            return Json(new { Success = "Success" });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
