import express from "express";
import multer from "multer";
import cors from "cors";
import { getRestauranteID, getRestaurantes, patchDadosRestaurante, postRestaurantes, deleteResteurante, getProdutosRestaurante, postProdutosRestaurante } from "./src/controller/restaurante.js";
import bodyParser from "body-parser";
import { verProdutos, criarProdutos, atualizarProdutos, verProdutoEspecifico, deletarProdutos } from "./src/controller/produtos.js";

export const app = express();

// Configuração do multer para armazenar arquivos temporariamente
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados temporariamente
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// Rotas
app.get("/api/restaurantes", getRestaurantes);
app.get("/api/restaurantes/:id", getRestauranteID);
app.post("/api/restaurantes", upload.single('foto'), postRestaurantes); // Adicione upload.single('foto') para a rota POST
app.patch("/api/restaurantes/:id", upload.single('foto'), patchDadosRestaurante); // Adicione upload.single('foto') para a rota PATCH
app.delete("/api/restaurantes/:id", deleteResteurante);
app.get("/api/restaurantes/:id/produtos", getProdutosRestaurante);
app.post("/api/restaurantes/produto", postProdutosRestaurante);

app.get("/api/produtos", verProdutos);
app.get("/api/produtos/:id", verProdutoEspecifico);
app.post("/api/produtos", upload.single('foto'), criarProdutos);
app.patch("/api/produtos/:id", upload.single('foto'), atualizarProdutos);
app.delete("/api/produtos/:id", deletarProdutos);
