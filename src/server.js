import https from 'https';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

// URL de la aplicación que queremos mantener activa
const appUrl = process.env.APP_URL || 'http://localhost:3000';

// Determinar si la URL usa http o https
const httpModule = appUrl.startsWith('https') ? https : http;

// Función para hacer la petición al servidor
const pingServer = () => {
  console.log(`Realizando ping a ${appUrl} para mantener el servidor activo...`);
  
  const request = httpModule.get(appUrl, (response) => {
    const { statusCode } = response;
    
    if (statusCode === 200) {
      console.log(`Ping exitoso: ${new Date().toLocaleString()} - Servidor activo`);
    } else {
      console.log(`Ping con respuesta inesperada: Código ${statusCode}`);
    }
    
    // Consumir la respuesta para liberar memoria
    response.resume();
  });
  
  request.on('error', (error) => {
    console.error(`Error al realizar ping: ${error.message}`);
  });
  
  // Establecer un timeout para la petición
  request.setTimeout(10000, () => {
    request.destroy();
    console.error('La petición ha excedido el tiempo de espera');
  });
};

// Intervalo para realizar pings cada 30 segundos
const PING_INTERVAL = 30 * 1000; // 30 segundos en milisegundos

// Iniciar el proceso de ping
const startPingProcess = () => {
  console.log(`Iniciando proceso de ping automático cada ${PING_INTERVAL/1000} segundos...`);
  
  // Realizar un ping inicial
  pingServer();
  
  // Configurar el intervalo para pings periódicos
  setInterval(pingServer, PING_INTERVAL);
};

// Iniciar el proceso cuando se ejecute este script
startPingProcess();

export { startPingProcess };