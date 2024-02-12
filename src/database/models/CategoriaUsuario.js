module.exports = (sequelize, dataTypes) => {
  let alias = "CatagoriaUsuario";

  let cols = {
    id: {
      types: dataTypes.INTERGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    nombre: {
      types: dataTypes.STRING(30),
      allowNull: false,
    },
  };
  let config = {
    tableName: "categoria_usuario",
    timestamps: false,
    /* timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false */
  };

  // asociación, que sera uno a uno con usuario, creo.
  CategoriaUsuario.associate = function (models) {
    CategoriaUsuario.hasMany(models.Usuario, {
      as: "usuario",
      foreignKey: "id_categoria_usuario",
    });
  };

  const CategoriaUsuario = sequelize.define(alias, cols, config);

  return CategoriaUsuario;
};
