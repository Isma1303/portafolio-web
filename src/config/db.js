import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';

dotenv.config();

async function addconnection(name, email, subjet, message) {
    let createConnection;
    try {

        createConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false
            }
        });
        console.log('Conectado a la base de datos correctamente');
        console.log('Intentando insertar:', { name, email, subjet, message });
        const query = 'INSERT INTO contactweb (name, email, subjet, message) VALUES (?, ?, ?, ?)';
        const [result] = await createConnection.execute(query, [name, email, subjet, message]); 
        
        console.log('Datos insertados correctamente:', result);
        return { success: true, id: result.insertId };
    } catch (error) {
        console.error('Database error details:', error.code, error.sqlMessage || error.message);
        console.error('Full error:', error);
        return { success: false, error: error.message };
    } finally {
        if (createConnection) await createConnection.end(); 
    }
}

export default addconnection;
