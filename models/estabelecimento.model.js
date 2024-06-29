module.exports = (sequelize, Sequelize) => {
  const Estabelecimento = sequelize.define(
    "estabelecimento",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      horario_abertura: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      horario_fechamento: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Estabelecimento;
};
