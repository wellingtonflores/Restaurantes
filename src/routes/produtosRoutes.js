import { Router } from "express";
import { atualizarProdutos, verProdutos, criarProdutos, verProdutoEspecifico } from "../controller/produtos";

const router = Router();

router.get("/", verProdutos);
router.get("/:id", verProdutoEspecifico);
router.post("/", criarProdutos);
router.post("/:id", atualizarProdutos);

