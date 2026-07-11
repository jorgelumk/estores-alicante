import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Configurar transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.estoresalicante.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'info@estoresalicante.com',
        pass: process.env.SMTP_PASSWORD || '',
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Validar configuración básica
    if (!process.env.SMTP_PASSWORD) {
      console.warn("Falta configurar la contraseña SMTP en las variables de entorno.");
    }

    // Preparar contenido del email según el tipo de formulario
    let subject = 'Nueva solicitud web';
    let html = '<h2>Nueva solicitud desde la web</h2>';

    if (data.type === 'contact') {
      subject = `Nuevo Contacto - ${data.name}`;
      html = `
        <h3>Datos de Contacto:</h3>
        <ul>
          <li><b>Nombre:</b> ${data.name}</li>
          <li><b>Email:</b> ${data.email}</li>
          <li><b>Teléfono:</b> ${data.phone}</li>
          <li><b>Dirección:</b> ${data.address}</li>
        </ul>
        <h3>Mensaje/Detalles:</h3>
        <p>${data.details || 'Sin detalles'}</p>
      `;
    } else if (data.type === 'presupuesto') {
      subject = `Nuevo Presupuesto a Medida - ${data.personalData?.name || 'Web'}`;
      
      const blindsHtml = data.blinds.map((blind: any, i: number) => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #eee;">
          <h4>Estor ${i + 1}: ${blind.model}</h4>
          <ul>
            <li><b>Apertura:</b> ${blind.aperture || 'N/A'}</li>
            <li><b>Color:</b> Elegir en medición</li>
            <li><b>Accionamiento:</b> ${blind.drive}</li>
            <li><b>Medidas:</b> ${blind.width}cm ancho x ${blind.height}cm alto</li>
            <li><b>Cantidad:</b> ${blind.quantity}</li>
          </ul>
        </div>
      `).join('');

      html = `
        <h3>Datos del Cliente:</h3>
        <ul>
          <li><b>Nombre:</b> ${data.personalData?.name}</li>
          <li><b>Teléfono:</b> ${data.personalData?.phone}</li>
          <li><b>Email:</b> ${data.personalData?.email}</li>
          <li><b>Dirección:</b> ${data.personalData?.street} ${data.personalData?.number}, ${data.personalData?.postal} ${data.personalData?.municipio}</li>
          <li><b>¿Instalación?:</b> ${data.personalData?.installation}</li>
        </ul>
        <h3>Comentarios:</h3>
        <p>${data.personalData?.comments || 'Ninguno'}</p>
        
        <h3>Estores Configurados:</h3>
        ${blindsHtml}
      `;
    }

    // Configurar opciones de envío
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Estores Alicante" <info@estoresalicante.com>',
      to: process.env.EMAIL_TO || 'info@estoresalicante.com',
      replyTo: data.email || (data.personalData && data.personalData.email) || undefined,
      subject: subject,
      html: html,
    };

    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error enviando email:', error);
    return NextResponse.json(
      { success: false, error: 'Error enviando el correo' },
      { status: 500 }
    );
  }
}
