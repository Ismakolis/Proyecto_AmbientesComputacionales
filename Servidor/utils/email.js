const nodemailer = require("nodemailer");
require("dotenv").config();

const enviarCorreoConfirmacion = async (destinatario, asunto, mensajeHTML) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.CORREO_REMITE,
        pass: process.env.CORREO_CLAVE_APP, 
      },
    });

    const mailOptions = {
      from: `"Tienda Online" <${process.env.CORREO_REMITE}>`,
      to: destinatario,
      subject: asunto,
      html: mensajeHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log(" Correo de confirmación enviado a:", destinatario);
  } catch (error) {
    console.error(" Error al enviar el correo:", error);
  }
};

module.exports = { enviarCorreoConfirmacion };
