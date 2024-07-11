import express from "express";
import { getRestauranteID, getRestaurantes, patchDadosRestaurante, postRestaurantes, deleteResteurante, getProdutosRestaurante } from "./src/controller/restaurante.js";
import bodyParser from "body-parser";

export const app = express();

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json())

app.get("/api/restaurantes", getRestaurantes);
app.get("/api/restaurantes/:id", getRestauranteID);
app.get("/api/restaurantes/:id/produtos", getProdutosRestaurante)
app.post("/api/restaurantes", postRestaurantes);
app.patch("/api/restaurantes/:id", patchDadosRestaurante);
app.delete("/api/restaurantes/:id", deleteResteurante);
