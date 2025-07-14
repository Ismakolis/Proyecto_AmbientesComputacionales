// ⚠️ Importa dotenv primero para poder acceder a las variables del .env
require('dotenv').config();

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// IMPORTA con destructuring la función correcta
const { enviarCorreoConfirmacion } = require('../utils/email');

exports.generarPago = async (req, res) => {
  try {
    const productos = req.body.productos;
    const correoUsuario = req.body.correo;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ mensaje: 'No hay productos para pagar' });
    }

    // Mapear productos para Stripe Checkout
    const line_items = productos.map(prod => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${prod.marca} ${prod.modelo}`,
        },
        unit_amount: Math.round(prod.precio * 100),
      },
      quantity: prod.cantidad || 1,
    }));

    // Crear sesión de pago con Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: 'http://localhost:4200/app/gracias',
      cancel_url: 'http://localhost:4200/gracias?canceled=true',
    });

    console.log('Checkout Session creada:', session.id);

    // Contenido del correo
    const resumenHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color:#4CAF50;">¡Gracias por tu compra!</h2>
      <p>Tu pedido se generó exitosamente. 🙌</p>
      <p><strong>Tu pedido llegará mañana.</strong></p>
      <p>Te notificaremos si hay alguna actualización en el estado de tu envío.</p>
      <p style="margin-top:20px;">Si tienes dudas o necesitas asistencia, puedes responder a este correo y estaremos encantados de ayudarte.</p>
      <p style="font-size:0.9em; color:#888; margin-top: 30px;">Tienda Online - Todos los derechos reservados</p>
    </div>
    `;

    // Enviar correo
    if (correoUsuario) {
      await enviarCorreoConfirmacion(
        correoUsuario,
        'Resumen de tu compra - Tienda Online',
        resumenHTML
      );
    }

    return res.status(200).json({ urlPago: session.url });

  } catch (error) {
    console.error('Error en generarPago:', error);
    return res.status(500).json({ mensaje: error.message });
  }
};
