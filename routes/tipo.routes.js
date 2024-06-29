module.exports = (app) => {
  const tipos = require("../controllers/tipo.controller.js");
  var router = require("express").Router();
  // Rota para criar um tipo
  router.post("/", tipos.create);
  // Rota que retorna todos os tipos
  router.get("/", tipos.findAll);
  // Rota que retorna um tipo pelo id
  router.get("/:id", tipos.findOne);
  // Rota que atualiza um tipo pelo id
  router.put("/:id", tipos.update);
  // Rota para deletar um tipo pelo id
  router.delete("/:id", tipos.delete);
  // Rota para deletar todos os tipos
  router.delete("/", tipos.deleteAll);
  // A linha abaixo informa que todos esses tipos são encontrados após o /tipos. Isto é, localhost:8080/tipos/rota
  app.use("/tipos", router);
};
