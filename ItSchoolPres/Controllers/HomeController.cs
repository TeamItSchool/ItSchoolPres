﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ItSchoolPres.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DragAndDrop()
        {
            ViewBag.Message = "Drag and drop test page.";

            return View();
        }

        public ActionResult QuizCustomizer()
        {
            ViewBag.Message = "Drag and drop test page.";

            return View();
        }
    }
}