/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    answers_details_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    type: {
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
        this.belongsTo(models.answers_details, { foreignKey:'answers_details_id'} );
      }
    }
  });
};
