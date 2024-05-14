import 'dotenv/config';
import nodemailer from 'nodemailer';

export default async function sendEmail(user, text) {
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email, //  email
          pass: process.env.emailpass  //  senha
        }
      });
  
      let mailOptions = {
        from: process.env.email,
        to: `${user}@lumma.com.br, gabriel.greco@lumma.com.br`,
        subject: 'Alerta - Automação',
        text: `${text}`
      };
  
      let info = await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar o email: ', error);
    }
  }
