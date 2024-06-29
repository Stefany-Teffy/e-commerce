module.exports = (sequelize, Sequelize) => {
  const Mercadoria = sequelize.define(
    "mercadoria",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      quantidade_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      data_adicao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      estabelecimento_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "estabelecimento",
          key: "id",
        },
      }
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Mercadoria;
};
