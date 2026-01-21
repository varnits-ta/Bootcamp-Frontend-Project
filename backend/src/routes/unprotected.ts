import { Router, Response } from "express";
import { products } from "../data/products";
import { loginUser } from "../middleware/auth";

const router = Router();

router.get("/hello", (_req: any, res: Response) => {
  res.send("Hello World!");
});

router.get("/products", (_req: any, res: Response) => {
  res.json(products);
});

router.post("/login", (req: any, res: Response) => {
  loginUser(req, res);
})

export default router;
