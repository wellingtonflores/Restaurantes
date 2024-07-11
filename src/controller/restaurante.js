import { db } from "../models/db.js";

export const getRestaurantes = async (req, res) => {
    try {
        const restaurantes = await db.query("SELECT * FROM restaurantes");
        res.status(200).json({ message: restaurantes.rows });
    } catch (error) {
        console.error(error);
    }
}

export const postRestaurantes = async (req, res) => {
    try {
        const { nome, endereco, horarariofuncionamento, } = req.body;
        await db.query ("INSERT INTO restaurantes (nome, endereco, horarariofuncionamento, ) VALUES  ($1, $2, $3)",
            [nome, endereco, horarariofuncionamento,]
        )
        res.status(200).json("Restaurante criado com sucesso");
    } catch (error) {
        console.error(error);
    }
}

export const getRestauranteID = async (req, res) => {
    try {
        const id = req.params.id
        const result = await db.query("SELECT * FROM restaurantes WHERE id = $1",[id]);
        if(!result.rows.length > 0){
            res.status(404).json({ error: "Restaurante com esse ID não existe"});
        } else {
            res.status(200).json({ message: result.rows });
        }
    } catch (error) {
        console.error(error);
    }
}

export const patchDadosRestaurante = async (req, res) => {
    try {
        const { nome, endereco, horarariofuncionamento } = req.body
        const idRestaurante = req.params.id

        const result = await db.query("SELECT * FROM restaurantes WHERE id = $1", [idRestaurante])
        const informacoesAntigas = result.rows[0];
         const novoNome = nome !== undefined && nome !== "" ? nome : informacoesAntigas.nome;
        const novoEndereco = endereco !== undefined && endereco !== "" ? endereco : informacoesAntigas.endereco;
        const novoHorarioFuncionamento = horarariofuncionamento !== undefined && horarariofuncionamento !== "" ? horarariofuncionamento : informacoesAntigas.horarariofuncionamento;

        await db.query(
            "UPDATE restaurantes SET nome = $1, endereco = $2, horarariofuncionamento = $3, = $4 WHERE id = $5",
            [novoNome, novoEndereco, novoHorarioFuncionamento, idRestaurante]
        );
        
        res.status(200).json({ message: "Restaurante alterado com sucesso", response2: result.rows });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Ocorreu um erro ao alterar o restaurante" });
    }
}

export const deleteResteurante = async (req, res) => {
    const idRestaurante = req.params.id;
    try {
        await db.query("DELETE FROM restaurantes WHERE id = $1", [idRestaurante]);
        res.status(200).json({message: "Restaurante deletado com sucesso"});
    } catch (error) {
        console.error(error);
    }
}


export const getProdutosRestaurante = async (req, res) => {
    try {
        const result = await db.query("SELECT restaurantes.id AS restaurante_id, restaurantes.nome AS restaurante_nome, produtos.id AS produto_id, produtos.nome AS produto_nome FROM restaurantes JOIN restaurantes_produtos ON restaurantes.id = restaurantes_produtos.restaurante_id JOIN produtos ON restaurantes_produtos.produto_id = produtos.id WHERE restaurantes.id = $1",
            [req.params.id]);
            if(result.rows.length === 0){
                res.status(404).json({ message: "Restaurante não encontrado" });
            }
            res.status(200).json({ message: result.rows });
    } catch (error) {
        console.error(error);
    }
}

