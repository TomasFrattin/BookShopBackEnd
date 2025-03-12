import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  // Obtener el token de las cabeceras Authorization
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  console.log("Token recibido en backend:", token); // Verificar que el token llega correctamente

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No hay token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Guardar los datos del usuario en `req.user`

    // Verificar si el rol del usuario es 'admin'
    if (req.user.rol !== "admin") {
      return res.status(403).json({ error: "Acceso denegado. Rol insuficiente." });
    }

    next(); // Continuar con la siguiente función si todo está bien
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
}
