
require('dotenv').config();


exports.logoutUsuario = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/'
  });

  res.json({ mensaje: 'Sesión cerrada correctamente' });
};
