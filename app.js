import express from "express";
import { getRestauranteID, getRestaurantes, patchDadosRestaurante, postRestaurantes, deleteResteurante, getProdutosRestaurante, postProdutosRestaurante } from "./src/controller/restaurante.js";
import bodyParser from "body-parser";
import { verProdutos, criarProdutos, atualizarProdutos, verProdutoEspecifico } from "./src/controller/produtos.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json())

app.get("/api/restaurantes", getRestaurantes);
app.get("/api/restaurantes/:id", getRestauranteID);
app.post("/api/restaurantes", postRestaurantes);
app.patch("/api/restaurantes/:id", patchDadosRestaurante);
app.delete("/api/restaurantes/:id", deleteResteurante);
app.get("/api/restaurantes/:id/produtos", getProdutosRestaurante)
app.post("/api/restaurantes/produto", postProdutosRestaurante);

app.get("/api/produtos", verProdutos);
app.get("/api/produtos/:id", verProdutoEspecifico);
app.post("/api/produtos", criarProdutos);
app.put("/api/produtos/:id", atualizarProdutos);
