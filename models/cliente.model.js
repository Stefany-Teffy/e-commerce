module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define(
    "cliente",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      data_registro: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Cliente;
};
