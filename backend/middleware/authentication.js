import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token required" });
  }
  const token = authHeader?.split(" ")[1];
  if(!token){
    res.status(400).json({
        message:"token is not available to verify"
    })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
// ye joo bhi userki id hamne token create karte time bheji hogi voo store kara dega 
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};