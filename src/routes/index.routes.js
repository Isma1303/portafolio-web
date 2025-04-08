import express from 'express';
import path from 'path';
import { Router } from 'express';
import { fileURLToPath } from 'url';
import addconnection from '../config/db.js';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.use(morgan('dev'));

router.get('/',
  (req, res) => {
    res.render('index');
  }
);


router.post("/", express.json(), express.urlencoded({ extended: true }), async (req, res) => {
  try {
      console.log('Recibido formulario de contacto:', req.body);
      const { name, email, subjet, message } = req.body;
      
      if (!name || !email || !subjet || !message) {
          console.error('Datos incompletos:', { name, email,subjet, message });
          return res.redirect('/contact?error=incomplete');
      }
      
      console.log('Intentando guardar en la base de datos:', { name, email,subjet, message });
      const result = await addconnection(name, email, subjet, message);
      console.log('Resultado de guardar en la base de datos:', result);
      
      if (result.success) {
          res.redirect('/contact?success=true');
      } else {
          console.error('Error al guardar en la base de datos:', result.error);
          res.redirect('/contact?error=true');
      }
  } catch (error) {
      console.error('Error procesando formulario de contacto:', error);
      res.redirect('/contact?error=true');
  }
});

export default router;