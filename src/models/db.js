import 'dotenv/config';
import pg from 'pg';

export const db = new pg.Client({
    user: process.env.userDB,
    database: process.env.DB,
    port: process.env.portDB,  
    password: process.env.passwordDB,
    host: process.env.hostDB
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados com sucesso.");
    }
});
