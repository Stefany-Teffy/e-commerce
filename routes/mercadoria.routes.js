module.exports = (app) => {
  const mercadorias = require("../controllers/mercadoria.controller.js");
  var router = require("express").Router();
  // Rota para criar uma mercadoria
  router.post("/", mercadorias.create);
  // Rota que retorna todas as mercadorias
  router.get("/", mercadorias.findAll);
  // Rota que retorna uma mercadoria pelo id
  router.get("/:id", mercadorias.findOne);
  // Rota que atualiza uma mercadoria pelo id
  router.put("/:id", mercadorias.update);
  // Rota para deletar uma mercadoria pelo id
  router.delete("/:id", mercadorias.delete);
  // Rota para deletar todas as mercadorias
  router.delete("/", mercadorias.deleteAll);
  // A linha abaixo informa que todas essas mercadorias são encontradas após o /mercadorias. Isto é, localhost:8080/mercadorias/rota
  app.use("/mercadorias", router);
};
