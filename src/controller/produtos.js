import { db } from "../models/db.js";
import fs from 'fs';

export const verProdutos = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM produtos");
        res.status(200).json(result.rows)
    } catch (error) {
        console.error(error)
    }
}

export const verProdutoEspecifico = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM produtos WHERE id = $1", [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const produto = result.rows[0];
        
        if (produto.foto) {
            produto.foto = produto.foto.toString('base64'); // Convertendo o campo foto para base64
        }

        res.status(200).json(produto); // Retornando o produto com a foto em base64
    } catch (error) {
        console.error('Erro ao recuperar produto:', error);
        res.status(500).json({ error: 'Erro ao recuperar o produto' });
    }
};


export const criarProdutos = async (req, res) => {
    const {nome, preco, categoria} = req.body
    const file = fs.readFileSync(req.file.path);
    try {
        await db.query("INSERT INTO produtos (nome, preco, categoria) VALUES ($1, $2, $3, $4)",[nome, preco, categoria, file])
        fs.unlinkSync(req.file.path);
        res.status(200).json({message: "Produto criado com sucesso"});
    } catch (error) {
        console.error(error)
    }
}

export const atualizarProdutos = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await db.query("SELECT * FROM produtos WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const dadosAntigos = result.rows[0];
        const { nome, preco, categoria } = req.body;

        const nomeAtualizado = nome !== undefined ? nome : dadosAntigos.nome;
        const precoAtualizado = preco !== undefined ? preco : dadosAntigos.preco;
        const categoriaAtualizado = categoria !== undefined ? categoria : dadosAntigos.categoria;
        let novaFoto = dadosAntigos.foto; // Manter a foto existente por padrão

        if (req.file) {
            const file = fs.readFileSync(req.file.path);
            novaFoto = file;
            // Remover o arquivo temporário após leitura
            fs.unlinkSync(req.file.path);
        }

        await db.query(
            "UPDATE produtos SET nome = $1, preco = $2, categoria = $3, foto = $4 WHERE id = $5",
            [nomeAtualizado, precoAtualizado, categoriaAtualizado, novaFoto, id]
        );

        res.status(200).json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o produto' });
    }
};

export const deletarProdutos = async (req, res) => {
    const id = req.params.id
    try {
        const result = await db.query("SELECT * FROM produtos WHERE id = $1",[id]);
        if(result.rows.length < 1){
            return res.json({ message: "Não existe produto com esse id"});
        }
        await db.query("DELETE FROM produtos WHERE id = $1",[id]);
        return res.status(200).json({ message: "Produto deletado com sucesso"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar produto" });
    }
}
