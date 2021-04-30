const Sequelize = require("sequelize");
const userModel1 = require("./models/Productos");


const sequelize = new Sequelize("m3ryQIBU8U", "m3ryQIBU8U", "flehmUPmEL", {
  host: "remotemysql.com",
  dialect: "mysql",
});


const Product = userModel1(sequelize, Sequelize);


sequelize.sync({ force: false }).then(() => {
  console.log("tablas sincronizadas");
});

module.exports = {
  Product
};
