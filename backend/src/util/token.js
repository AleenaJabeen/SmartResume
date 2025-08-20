import jwt from "jsonwebtoken";

export const generateToken = () => {
  return jwt.sign({},process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
};