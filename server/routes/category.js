import express from "express";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} from "../controllers/category.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();

// public
router.get("/", getCategories);

// admin protected
router.post("/", protect("admin", "manager"), createCategory);
router.put("/:id", protect("admin", "manager"), updateCategory);
router.delete("/:id", protect("admin", "manager"), deleteCategory);

export default router;
