import express, { Router } from "express";
const router = express.Router();
import {login, registration} from "../app/controllers/authController.js"
import {isLoggedIn} from "../app/middlewares/authMiddleware.js";
import { allPortfolio, createPortfolio, deletePortfolio, updatePortfolio } from "../app/controllers/portfolioController.js";

//Authentication
router.post("/register",registration);
router.get("/login",login);

//Portfolio CRUD
router.post("/create-portfolio",isLoggedIn,createPortfolio);
router.get("/all-portfolio",isLoggedIn,allPortfolio);
router.post("/update-portfolio/:id",isLoggedIn,updatePortfolio);
router.post("/remove-portfolio/:id",isLoggedIn,deletePortfolio);

export default router;