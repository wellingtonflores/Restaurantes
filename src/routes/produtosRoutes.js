import { Router } from "express";
import { atualizarProdutos, verProdutos, criarProdutos, verProdutoEspecifico, deletarProdutos } from "../controller/produtos";

const router = Router();

router.get("/", verProdutos);
router.get("/:id", verProdutoEspecifico);
router.post("/", criarProdutos);
router.patch("/:id", atualizarProdutos);
router.delete("/:id", deletarProdutos);

