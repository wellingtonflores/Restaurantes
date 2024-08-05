import { db } from "../models/db.js";
import fs from 'fs';

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
        const file = fs.readFileSync(req.file.path);
        await db.query ("INSERT INTO restaurantes (nome, endereco, horarariofuncionamento, foto) VALUES  ($1, $2, $3, $4)",
            [nome, endereco, horarariofuncionamento, file]
        )

        fs.unlinkSync(req.file.path);

        res.status(200).json("Restaurante criado com sucesso");
    } catch (error) {
        console.error(error);
    }
}

export const getRestauranteID = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM restaurantes WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Restaurante com esse ID não existe" });
        }

        const restaurante = result.rows[0];
        
        if (restaurante.foto) {
            restaurante.foto = restaurante.foto.toString('base64');
        }

        res.status(200).json({ restaurante });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao recuperar restaurante" });
    }
};



export const patchDadosRestaurante = async (req, res) => {
    try {
        const { nome, endereco, horarariofuncionamento,} = req.body
        const idRestaurante = req.params.id

        const result = await db.query("SELECT * FROM restaurantes WHERE id = $1", [idRestaurante])
        const informacoesAntigas = result.rows[0];
        const novoNome = nome !== undefined && nome !== "" ? nome : informacoesAntigas.nome;
        const novoEndereco = endereco !== undefined && endereco !== "" ? endereco : informacoesAntigas.endereco;
        const novoHorarioFuncionamento = horarariofuncionamento !== undefined && horarariofuncionamento !== "" ? horarariofuncionamento : informacoesAntigas.horarariofuncionamento;
        let novaFoto = informacoesAntigas.foto; // Manter a foto existente por padrão

        // Processar nova foto se fornecida
        if (req.file) {
            const file = fs.readFileSync(req.file.path);
            novaFoto = file;
            // Remover o arquivo temporário após leitura
            fs.unlinkSync(req.file.path);
        }

        // Query de atualização
        await db.query(
            "UPDATE restaurantes SET nome = $1, endereco = $2, horarariofuncionamento = $3, foto = $4 WHERE id = $5",
            [novoNome, novoEndereco, novoHorarioFuncionamento, novaFoto, idRestaurante]
        );
        
        res.status(200).json({ message: "Restaurante alterado com sucesso"});
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
                res.status(404).json({ message: "Não existem produtos nesse restaurante" });
            }
            res.status(200).json({ message: result.rows });
    } catch (error) {
        console.error(error);
    }
}

export const postProdutosRestaurante = async (req, res) => {
    const {restaurante_id, produto_id} = req.body
    try {
        await db.query("INSERT INTO restaurantes_produtos (restaurante_id, produto_id) VALUES ($1, $2)", 
            [restaurante_id, produto_id]);
        res.status(200).json({ message: "Produto adicionado no restaurante com sucesso"});
    } catch (error) {
        console.log(error);
    }
}

