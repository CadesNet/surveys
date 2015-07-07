/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: 'CHAR(1)',
      allowNull: false,
    },
    number_of_options: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    survey_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    classMethods:{
      associate:function(models){
        this.belongsTo(models.surveys, { foreignKey:'survey_id'} );
        this.hasMany(models.options, { foreignKey: 'question_id'} );
      }
    }
  });
};
