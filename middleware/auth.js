import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  console.log("Token recibido en backend:", token);

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado. Rol insuficiente." });
    }

    next(); 
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
}
