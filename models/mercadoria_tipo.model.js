module.exports = (sequelize, Sequelize) => {
  const Mercadoria_Tipo = sequelize.define(
    "mercadoria_tipo",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mercadoria_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "mercadoria",
          key: "id",
        },
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: "tipo",
          key: "id",
        },
      },
    },
    {
      // Garante que o nome da tabela no banco seja igual ao que informamos entre aspas com o sequelize.define()
      freezeTableName: true,
    }
  );

  return Mercadoria_Tipo;
};
