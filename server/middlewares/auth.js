import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    if (!token) {
      req.user = null; 
      return next();
    }
  }
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.send(401).json({ message: "Response is not authorized" });
  }
};

export default protectRoute;
