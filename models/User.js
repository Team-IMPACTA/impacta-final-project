module.exports = (sequelize, DataType) => {

    const User = sequelize.define('User', {
        id:{
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        email: DataType.STRING,
        password: DataType.STRING(255),
        phone: DataType.STRING,
        cargo: DataType.STRING,
        cliente_id: DataType.INTEGER,
        createdAt:{
            type: DataType.DATE
        },
        updatedAt: {
            type: DataType.DATE
        }
    },
    {
        tableName: "users"
    });
    return User;
}