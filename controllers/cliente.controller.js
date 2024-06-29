const db = require("../models");
const Cliente = db.Cliente;
const Op = db.Sequelize.Op;

// Cria e salva um novo cliente
exports.create = (req, res) => {
  // Validar requisição. Aqui verificamos se algum parâmetro está vazio
  if (!req.body.cpf) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
    return;
  }

  // Criar um cliente
  const cliente = {
    cpf: req.body.cpf,
    nome: req.body.nome,
    email: req.body.email,
    idade: req.body.idade,
    telefone: req.body.telefone,
    data_registro: req.body.data_registro,
  };

  // Salvar cliente no banco de dados
  Cliente.create(cliente)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a criação do Cliente.",
      });
    });
};

// Retorna todos os clientes  do banco de dados. Podemos passar um parâmetro e filtrar
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Cliente.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro durante a procura por Cliente.",
      });
    });
};

// Encontra um cliente pelo cpf
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Não é possível achar Cliente com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro na busca por Cliente via id=" + id,
      });
    });
};

// Atualiza os dados de um cliente
exports.update = (req, res) => {
  const id = req.params.id;

  Cliente.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cliente foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Não foi possível atualizar Cliente com id=${id}. Talvez cliente não tenha sido encontrada ou req.body está vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Cliente via id=" + id,
      });
    });
};

// Deleta um cliente pelo id
exports.delete = (req, res) => {
  const id = req.params.id;

  Cliente.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cliente foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Não é possível deletar esse Cliente; Ele não foi encontrado!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Não é possível deletar Cliente com id=" + id,
      });
    });
};

// Deleta todos os Clientes do banco de dados
exports.deleteAll = (req, res) => {
  Cliente.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Clientes foram deletadas com sucesso!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro enquanto deletava Clientes.",
      });
    });
};
