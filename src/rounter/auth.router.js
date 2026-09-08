import { Router } from "express";
import { signup, signin, profile } from "../controller/auth.controller.js";
import { verifyToken, verifyRefreshToken } from "../middleware/jwt.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", verifyToken,profile);
router.post("/refresh-token", verifyRefreshToken, (req, res) => {
  const { user } = req;
  const { token, refreshToken } = generateToken(user);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true ,
    sameSite:"none" ,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true ,
    sameSite:"none" ,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ message: "Token refreshed successfully", token });
});

export default router;