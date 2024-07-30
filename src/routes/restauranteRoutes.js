import { Router } from "express";
import { getRestauranteID, getRestaurantes, patchDadosRestaurante, postRestaurantes, deleteResteurante, getProdutosRestaurante, postProdutosRestaurante } from "../controller/restaurante";

const router = Router();

router.get("/", getRestaurantes);
router.get("/:id", getRestauranteID);
router.post("/", postRestaurantes);
router.patch("/:id", patchDadosRestaurante);
router.delete("/:id", deleteResteurante);
router.get("/:id", getProdutosRestaurante)
router.post("/", postProdutosRestaurante);