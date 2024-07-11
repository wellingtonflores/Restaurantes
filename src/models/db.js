import pg from "pg";

export const db = new pg.Client({
    user: "postgres",
    database: "goomerRestaurantes",
    port: "5432",
    password: "minhamae1",
    host: "localhost"

})

db.connect((err) => {
    if(err){
        console.error("Erro ao conectar ao banco de dados:", err);
    } else {
        console.log("Conectado ao banco de dados com sucesso.");
    }
})