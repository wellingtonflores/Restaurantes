import { Router } from "express";
import { getRestauranteID, getRestaurantes, patchDadosRestaurante, postRestaurantes, deleteResteurante, getProdutosRestaurante } from "../controller/restaurante";

const router = Router();

router.get("/", getRestaurantes);
router.get("/:id", getRestauranteID);
router.get("/:id", getProdutosRestaurante)
router.post("/", postRestaurantes);
router.patch("/:id", patchDadosRestaurante);
router.delete("/:id", deleteResteurante);