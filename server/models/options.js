/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('options', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    classMethods:{
      associate:function(models){
        this.belongsTo(models.questions, { foreignKey:'question_id'} );
      }
    }
  });
};
