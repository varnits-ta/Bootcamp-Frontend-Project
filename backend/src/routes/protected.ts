import { Router, Response } from "express";
import { verifyToken } from "../middleware/auth";
import { users } from "../data/users";

const userCarts: { [username: string]: { [productId: number]: number } } = {};

const router = Router();

router.get("/profile", verifyToken, (_req: any, res: Response) => {
  try {
    res.json({
      users: users.map((user) => ({
        username: user.username,
        role: user.role,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Get cart - protected
router.get("/cart", verifyToken, (req: any, res: Response) => {
  try {
    const username = req.user.username;
    const userCart = userCarts[username] || {};

    const cartItems = Object.entries(userCart).map(([productId, quantity]) => ({
      productId: parseInt(productId),
      quantity,
    }));

    res.json({ cart: cartItems });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Add to cart - protected
router.post("/add-to-cart", verifyToken, (req: any, res: Response) => {
  try {
    const { productId } = req.body;
    const username = req.user.username;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    if (!userCarts[username]) {
      userCarts[username] = {};
    }

    if (userCarts[username][productId]) {
      userCarts[username][productId] += 1;
    } else {
      userCarts[username][productId] = 1;
    }

    res.json({
      message: "Item added to cart",
      cart: userCarts[username],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

router.post("/logout", (_req: any, res: Response) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to logout" });
  }
});

export default router;
