import express, { json } from "express";
import { json as _json, urlencoded } from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import cookie from "cookie-parser";
import { config } from "dotenv";
config();
const app = express();
import authRouter from "./src/rounter/auth.router.js";
import TransportRouter from "./src/rounter/transport.router.js";
const PORT = process.env.PORT || 3000;

connect(process.env.MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
     credentials: true
}));
app.use(cookie());
app.get("/api",(req, res) => {
  res.json({ message: "Welcome to the API!" });
});
app.use("/api/auth",authRouter);
app.use("/api",TransportRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

